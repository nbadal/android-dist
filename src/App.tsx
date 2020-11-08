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
    "#d3ded3",
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

    useEffect(() => {
        const proxy = "https://cors-anywhere.herokuapp.com/"
        const url = "https://dl.google.com/android/studio/metadata/distributions.json";
        fetch(proxy + url)
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

    let percentage = 1.0
    return (
        <div className="App">
            {fetchError && (
                <div>{fetchError}</div>
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
                            const style: CSSProperties = {
                                backgroundColor: colors[idx % colors.length]
                            }
                            const row = (
                                <React.Fragment key={d.apiLevel}>
                                    <div className="version" style={style}>{d.version}</div>
                                    <div style={style}>{d.name}</div>
                                    <div className="apiLevel" style={style}>{d.apiLevel}</div>
                                    <div style={style}>{(d.distributionPercentage * 100).toFixed(1)}%</div>
                                    <div style={style}>{(percentage * 100).toFixed(1)}%</div>
                                </React.Fragment>
                            );
                            percentage -= d.distributionPercentage;
                            return row;
                        })}
                    </div>
                    <div className="Updated" onClick={() => setRefreshTime(Date.now)}>
                        Last Updated by Google: <span>{lastModified}</span>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
