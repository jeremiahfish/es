import React from 'react'
import { GoogleMap, Marker } from "@react-google-maps/api";


const containerStyle = {
    width: '100%',
    height: '100vh',
};


export default function Map(props) {
    const { data } = props;
    const svg_ping = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cg transform='translate(100,100)'%3E%3Cg id='pulse' %3E%3CradialGradient id='SVGID_4_' cx='100' cy='100' r='21.2498' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' style='stop-color:%23FFFFFF;stop-opacity:0'/%3E%3Cstop offset='1' style='stop-color:%230063B199' /%3E%3C/radialGradient%3E%3Cpath opacity='0.5' fill='url(%23SVGID_4_)' stroke='url(%23SVGID_4_)' stroke-width='0.5' stroke-miterlimit='10' d='M120.864,99.676 c0,11.599-9.401,21-21,21c-11.598,0-21-9.401-21-21c0-11.598,9.402-21,21-21c6.705,0,12.679,3.144,16.523,8.037 C119.193,90.281,120.864,94.783,120.864,99.676z' transform='translate( -100 -100)'/%3E%3CanimateTransform attributeType='xml' attributeName='transform' type='scale' from='0' by='3' dur='2s' fill='freeze' repeatCount='indefinite' /%3E%3Canimate attributeType='xml' attributeName='fill-opacity' from='0' to='0' values='0;0.5;0' dur='2s' repeatCount='indefinite' fill='freeze' /%3E%3C/g%3E%3C/g%3E%3Cg id='centre'%3E%3Ccircle cx='100' cy='100' r='9' fill='%230063B1' stroke='%23fff' stroke-opacity='1' stroke-width='3'/%3E%3C/g%3E%3C/svg%3E";
    const svg_vehicle = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjQiIGhlaWdodD0iMjQiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTIzLjI5MTY3LDM1LjgzMzMzYy04Ljg5MDI1LDAgLTE2LjEyNSw3LjIzNDc1IC0xNi4xMjUsMTYuMTI1djYwLjkxNjY3YzAsOC44OTAyNSA3LjIzNDc1LDE2LjEyNSAxNi4xMjUsMTYuMTI1aDIuNTYxNTJjMi4zNjI4Miw4LjIzNTk4IDkuOTgxMDksMTQuMzMzMzMgMTguOTM4NDgsMTQuMzMzMzNjOC45NTczOSwwIDE2LjU3NTY1LC02LjA5NzM1IDE4LjkzODQ4LC0xNC4zMzMzM2gzMS4yMjgxOWMyLjk2NywwIDUuMzc1LC0yLjQwNDQyIDUuMzc1LC01LjM3NXYtNzEuNjY2NjdjMCwtOC44OTAyNSAtNy4yMzQ3NSwtMTYuMTI1IC0xNi4xMjUsLTE2LjEyNXpNMTA3LjUsNTAuMTY2Njd2NzMuNDU4MzNjMCwxMC44MjAyMSA4Ljg4ODEyLDE5LjcwODMzIDE5LjcwODMzLDE5LjcwODMzYzguOTU3MzksMCAxNi41NzU2NSwtNi4wOTczNSAxOC45Mzg0OCwtMTQuMzMzMzNoMi41NjE1MmM4LjkwNDU4LDAgMTYuMTI1LC03LjIyMDQyIDE2LjEyNSwtMTYuMTI1di0yMi44MDE3NmMwLC0yLjI1NzUgLTAuNDc1NDEsLTQuNDkwMzYgLTEuMzkyNzQsLTYuNTUwNzhsLTEwLjU2ODAzLC0yMy43NzQ1OGMtMi41ODcxNywtNS44MjY1IC04LjM2MTA5LC05LjU4MTIyIC0xNC43MzIyNiwtOS41ODEyMnpNMTIxLjgzMzMzLDYwLjkxNjY3aDE2LjMwNjk3YzIuMTI0OTIsMCA0LjA0NjA5LDEuMjQ5MjQgNC45MDYwOSwzLjE5MTQxbDUuODkyOSwxMy4yNjk1M2MxLjA1MzUsMi4zNjg1OCAtMC42Nzc2NCw1LjAzOTA2IC0zLjI2ODM5LDUuMDM5MDZoLTIzLjgzNzU3Yy0xLjk3OCwwIC0zLjU4MzMzLC0xLjYwNTMzIC0zLjU4MzMzLC0zLjU4MzMzdi0xNC4zMzMzM2MwLC0xLjk3OCAxLjYwNTMzLC0zLjU4MzMzIDMuNTgzMzMsLTMuNTgzMzN6TTQ0Ljc5MTY3LDExNC42NjY2N2M1LjAwMzc5LDAgOC45NTgzMywzLjk1NDU1IDguOTU4MzMsOC45NTgzM2MwLDUuMDAzNzkgLTMuOTU0NTUsOC45NTgzMyAtOC45NTgzMyw4Ljk1ODMzYy01LjAwMzc5LDAgLTguOTU4MzMsLTMuOTU0NTUgLTguOTU4MzMsLTguOTU4MzNjMCwtNS4wMDM3OSAzLjk1NDU1LC04Ljk1ODMzIDguOTU4MzMsLTguOTU4MzN6TTEyNy4yMDgzMywxMTQuNjY2NjdjNS4wMDM3OSwwIDguOTU4MzMsMy45NTQ1NSA4Ljk1ODMzLDguOTU4MzNjMCw1LjAwMzc5IC0zLjk1NDU1LDguOTU4MzMgLTguOTU4MzMsOC45NTgzM2MtNS4wMDM3OSwwIC04Ljk1ODMzLC0zLjk1NDU1IC04Ljk1ODMzLC04Ljk1ODMzYzAsLTUuMDAzNzkgMy45NTQ1NSwtOC45NTgzMyA4Ljk1ODMzLC04Ljk1ODMzeiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+";


    let objType = null;
    switch (props.currentTab) {
        case 0: objType  = 'people'; break;
        case 1: objType  = 'equipment'; break;
        case 2: objType  = 'tags'; break;
        case 3: objType  = 'tags'; break;
        case 4: objType  = 'vehicles'; break;
        default: objType = 'people';
    }

    return (
        <GoogleMap options={{ mapId: '15431d2b469f209e', disableDefaultUI: true}} mapContainerStyle={containerStyle}
            onLoad={props.onLoad} disableDefaultUI={true} zoomControl={false}  >

            {data[objType].map((item) => (
                item.location ? (
                    <Marker position={{
                        lat: parseFloat(`${item.location[0].lat}`),
                        lng: parseFloat(`${item.location[0].lng}`)
                    }}

                    icon=
                    {(() => {
                        switch (objType) {
                            case 'people': return { url: `${item.avatar}#${objType}_marker` };
                            case 'equipment': return { url: `${item.avatar}#${objType}_marker` };
                            case 'vehicles': return { url: `${svg_vehicle}#${objType}_marker` };
                            case 'tags': return { url: `${svg_ping}#${objType}_marker` };
                            default: return { url: `${item.avatar}#${objType}_marker` };
                        }
                    })()}
                    />
                ) : null
            ))}
        </GoogleMap>
    )
}
