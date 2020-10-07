import * as React from "react";
import * as ReactDOM from "react-dom";

type Props = {
    modals: Record<string, React.FunctionComponent<any>>;
    component?: React.ComponentType<any>;
    container?: Element;
}

export const ModalRoot = React.memo(
    ({

        modals,
        container,
        component: RootComponent = React.Fragment
    }: Props) => {
        const [mountNode, setMountNode] = React.useState<Element | undefined>(undefined);

        React.useEffect(() => setMountNode(container || document.body), [container]);

        return mountNode
            ? ReactDOM.createPortal(
                <RootComponent>
                    {Object.keys(modals).map(key => {
                        let ModalComponent = modals[key];
                        return <ModalComponent key={key} />
                    })}
                </RootComponent>,
                mountNode
            )
            : null;
    }
);