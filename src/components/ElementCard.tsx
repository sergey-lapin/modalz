import React from 'react';

type ElementT = {
    atomicMass: string,
    atomicNumber: number,
    atomicRadius: number,
    boilingPoint: number,
    bondingType: string,
    cpkHexColor: string,
    density: number,
    electronAffinity: number,
    electronegativity: number,
    electronicConfiguration: string,
    groupBlock: string,
    ionRadius: string,
    ionizationEnergy: number,
    meltingPoint: number,
    name: string,
    oxidationStates: string,
    standardState: string,
    symbol: string,
    vanDelWaalsRadius: number,
    yearDiscovered: number
}

export const ElementCard = ({ border, element, children }: { border: string, element: ElementT, children?: any }) => {
    let aspectRatio = 1.25;
    const width = 250;
    let borderWidth = 15;
    let borderRadius = 10;
    let atomicMass = element.atomicMass.indexOf('.') ? element.atomicMass.slice(0, element.atomicMass.indexOf('.') + 2) : element.atomicMass

    return <div
        style={{
            border: '1px black solid',
            background: 'white',
            left: 50,
            top: 50,
            boxSizing: 'border-box',
            padding: `${borderWidth}px`,
            width,
            height: aspectRatio * width,
            borderRadius
        }}
    >
        <div
            style={{
                border: border,
                borderWidth,
                borderStyle: 'solid',
                height: '100%',
                boxSizing: 'border-box',
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                borderRadius,
            }}>
            {children}
            <div style={{
                padding: '15px',
            }}>
                <div
                    style={{
                        textAlign: 'right',
                    }}>
                    {atomicMass}
                </div>
                <div style={{
                    textAlign: 'center',
                    fontSize: 80
                }}>
                    {element.symbol}
                </div>
                <div style={{
                    textAlign: 'right',
                    fontSize: 20
                }}>
                    {element.atomicNumber}
                </div>
                <div style={{
                    textAlign: 'center',
                    fontSize: 20
                }}>
                    {element.name}
                </div>
                <div style={{
                    textAlign: 'center',
                    marginTop: 20
                }}>
                    {element.electronicConfiguration}
                </div>
            </div>
        </div>
    </div>
}