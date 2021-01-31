import * as React from 'react';
import * as R from 'ramda';
import Graph from 'graph';
import useStore from 'hooks/useStore';
import Datasets from 'components/Datasets';
const loading = () => (change: Graph.Chart.ChangeEvent) =>
  useStore.getState().set((state: { store: { chart: { event: { changes: Graph.Chart.ChangeEvent[]; }; }; }; }) => void state.store.chart.event.changes.push(change));

const Chart = (props: { id: string; reference: React.MutableRefObject<Graph.Chart> }): JSX.Element => {
  const state = useStore((state) => state.store.chart.props);
  return (
    <Graph.Chart
      items={state.items}
      options={state.options}
      animation={state.animation}
      layout={state.layout}
      combine={state.combine}
      ref={props.reference}
      onCombineNodes={R.always(undefined)}
      onCombineLinks={R.always(undefined)}
      onChartChange={loading}
    />
  );
};

const Network = ({}) => {
  const chartRef = React.useRef({} as Graph.Chart);
  const selected = useStore((state) => state.store.selected);
  return typeof selected == 'string' ? <Chart id={selected} reference={chartRef} /> : <Datasets />;
};

export default Network;
