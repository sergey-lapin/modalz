import React from 'react';
import './ElementCard.css'
let pt = require('periodic-table');

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

export const getElementNumber = (id: number) => {
    return Math.max(id % (Object.keys(pt.elements).length), 1)
}

export let getElementColor = (id: number) => {
    return pt.numbers[getElementNumber(id)].cpkHexColor !== 'FFFFFF' ? `#${pt.numbers[getElementNumber(id)].cpkHexColor}` : '#000'
}

export const ElementCard = ({ elementNumber, children }: { elementNumber: number, children?: any }) => {
    let aspectRatio = 1.25;
    const width = 250;
    let borderWidth = 15;
    let borderRadius = 10;

    let element: ElementT = pt.numbers[getElementNumber(elementNumber)]

    let atomicMass = element.atomicMass.indexOf('.') ? element.atomicMass.slice(0, element.atomicMass.indexOf('.') + 2) : element.atomicMass

    return <div
        className="element-card"
        style={{
            padding: `${borderWidth}px`,
            width,
            height: aspectRatio * width,
            borderRadius
        }}
    >
        <div
            className="element-card-border"
            style={{
                borderColor: getElementColor(element.atomicNumber),
                borderWidth,
                borderRadius,
            }}>
            {children}
            <div className="element-card-content">
                <div className="atomicMass">
                    {atomicMass}
                </div>
                <div className="symbol">
                    {element.symbol}
                </div>
                <div className="atomic-number">
                    {element.atomicNumber}
                </div>
                <div className="name">
                    {element.name}
                </div>
                <div className="electronic-configuration">
                    {element.electronicConfiguration}
                </div>
            </div>
        </div>
    </div>
}