

export interface IMetrics {
    metrics: string
}

export default function Metrics(props: IMetrics) {
    return <pre>
        {props.metrics}
    </pre>
}