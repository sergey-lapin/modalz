export const invariantViolationFunctionalComponentOnly = () => {
    throw new Error(
        "Only functional component allowed as argument."
    );
};

export const isFunctionalComponent = (Component: Function) => {
    const prototype = Component.prototype;
    return !prototype || !prototype.isReactComponent;
};

export const assertFunctionalComponent = (component: React.FunctionComponent<any>) => {
    if (!isFunctionalComponent(component)) {
        invariantViolationFunctionalComponentOnly()
    }
};

export const invariantViolationUseModalOutsideProvider = (): any => {
    throw new Error(
        "useModal can not be used without ModalProvider"
    );
};

