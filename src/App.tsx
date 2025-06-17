import React, { CSSProperties, useEffect, useState } from 'react';
import './App.css';

type Distribution = {
    name: string,
    version: string,
    apiLevel: number,
    distributionPercentage: number,
    url: string,
    descriptionBlocks: DescriptionBlock[],
}

type DescriptionBlock = {
    title: string,
    body: string,
}

const colors = [
    "#D3DED3",
    "#7DC691",
    "#92B2B7",
    "#DEBA40",
    "#E55D5F",
    "#6EC0D2",
    "#D88D63",
    "#FF9229",
    "#EABD2D",
]

function App() {
    const [refreshTime, setRefreshTime] = useState(Date.now)
    const [distributions, setDistributions] = useState<Distribution[]>([]);
    const [lastModified, setLastModified] = useState("");
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [expandedDetail, setExpandedDetail] = useState<number | null>(null);

    useEffect(() => {
        const url = "https://us-central1-android-distro.cloudfunctions.net/distros";
        fetch(url)
            .then(res => res.json().then(data => [data, res.headers.get("Last-Modified")]))
            .then(([data, modified]) => {
                setDistributions(data);
                setLastModified(modified);
                setFetchError(null);
            })
            .catch(err => {
                setDistributions([]);
                setFetchError(err.message);
            })
    }, [refreshTime]);

    let cumulative = 1.0
    return (
        <div className="App">
            {fetchError && (
                <div>Couldn't load latest stats: {fetchError}</div>
            )}
            {distributions.length > 0 && (
                <>
                    <div className="List">
                        <div className="Header" />
                        <div className="Header">Platform Version</div>
                        <div className="Header">API Level</div>
                        <div className="Header">% of Distribution</div>
                        <div className="Header">Cumulative Distribution</div>
                        {distributions.map((d, idx) => {
                            const isSelected = idx === expandedDetail;
                            const style: CSSProperties = {
                                backgroundColor: colors[idx % colors.length],
                                cursor: "pointer",
                            }
                            const detailStyle: CSSProperties = {
                                display: isSelected ? "block" : "none",
                                backgroundColor: colors[idx % colors.length],
                            }
                            const onClick = () => setExpandedDetail(isSelected ? null : idx);
                            const row = (
                                <React.Fragment key={d.apiLevel}>
                                    <div className="Version" style={style} onClick={onClick}>{d.version}</div>
                                    <div style={style} onClick={onClick} >{d.name}</div>
                                    <div className="ApiLevel" style={style} onClick={onClick}>{d.apiLevel}</div>
                                    <div style={style} onClick={onClick}>{(d.distributionPercentage * 100).toFixed(1)}%</div>
                                    <div style={style} onClick={onClick}>{(cumulative * 100).toFixed(1)}%</div>
                                    <div className="Detail" style={detailStyle}>
                                        <a className="Link" href={d.url}>Release Notes</a>
                                        {d.descriptionBlocks.map((block) => (
                                            <div className="DetailBock" key={block.title}>
                                                <div className="DetailTitle">{block.title}</div>
                                                <div className="DetailBody">{
                                                    // Make <br>'s functional.
                                                    block.body.split("<br>").map((text, i) => {
                                                        if (i === 0) {
                                                            return (<span key={i}>{text}</span>);
                                                        } else {
                                                            return (
                                                                <React.Fragment key={i}>
                                                                    <br />
                                                                    <span>{text}</span>
                                                                </React.Fragment>
                                                            );
                                                        }
                                                    })
                                                }</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="Spacer"/>
                                </React.Fragment>
                            );
                            cumulative -= d.distributionPercentage;
                            return row;
                        })}
                    </div>
                    <div className="Footer" onClick={() => setRefreshTime(Date.now)}>
                        <a href="https://github.com/nbadal/android-dist">Github</a> | Last Updated by Google: <span>{lastModified}</span>
                        {lastModified.includes("2020") && (<span> (yes it really has been that long...)</span>)}
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
