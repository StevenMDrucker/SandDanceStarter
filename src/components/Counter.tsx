import * as React from 'react';

export interface ICounterProps {
    count: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

export class Counter extends React.Component<ICounterProps, void> {
    public render() {
        const { count, onIncrease, onDecrease } = this.props;
        return (
            <div>
                <div>Counter</div>

            </div>
        );
    }
}
