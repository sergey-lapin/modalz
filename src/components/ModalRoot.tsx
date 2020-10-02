import * as React from "react";
import * as ReactDOM from "react-dom";

const ModalRenderer = React.memo(({ component, onClose, ...rest }: {
    component: React.FunctionComponent<any>;
    onClose: Function
}) =>
    component({ onClose, ...rest })
);

type Props = {
    onClose: Function;
    modals: Record<string, React.FunctionComponent<any>>;
    component?: React.ComponentType<any>;
    container?: Element;
}

export const ModalRoot = React.memo(
    ({
        onClose,
        modals,
        container,
        component: RootComponent = React.Fragment
    }: Props) => {
        const [mountNode, setMountNode] = React.useState<Element | undefined>(undefined);

        React.useEffect(() => setMountNode(container || document.body), [container]);

        return mountNode
            ? ReactDOM.createPortal(
                <RootComponent>
                    {Object.keys(modals).map(key => (
                        <ModalRenderer key={key}
                            component={modals[key]}
                            onClose={() => onClose(key)}
                        />
                    ))}
                </RootComponent>,
                mountNode
            )
            : null;
    }
);