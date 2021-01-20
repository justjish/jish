'use strict';
import type { Items } from '../app';
import type { Chart } from 'graph/index';
export const ITEMS: Items = {
  node1: {
    color: 'red',
    label: { text: 'Source' },
    data: {
      id: 'node1',
      cluster_id: '155dKjL5MspzBAF1ZSAeU7Zr6pXq5HTHyX',
      entity: 'unknown',
      tainted: 0.15509888,
      total_amt_received: 0.15509888,
      sumscore: 1,
      is_source: true,
      is_stop_cluster: false,
      clustersize: 1,
      entitytype: 'unknown',
      balance: 0,
    },
  },
};
export const ANIMATION: Chart.AnimationOptions = {
  animate: true,
  time: 1250,
};
export const LAYOUT: Chart.LayoutOptions = {
  consistent: true,
  level: 'hops',
  name: 'organic',
  orientation: 'down',
  packing: 'circle',
  stretch: 1,
  tightness: 5,
};
export const COMBINE: Chart.CombineOptions = {
  properties: [],
  level: 0,
};
export const OPTIONS: Chart.Options = {
  backgroundColor: 'rgba(0, 0, 0, 0)',
  combo: {
    autoSelectionStyle: true,
  },
  overview: false,
  controlColor: 'rgba(0, 0, 0, 0)',
  dragPan: true,
  fadeOpacity: 0.5,
  fit: 'auto',
  handMode: true,
  hoverDelay: 1,
  navigation: false,
  labels: {
    fontFamily: 'sans-serif',
    showOnHover: true,
  },
  links: {
    arrowSize: 'normal',
    avoidLabels: true,
    endSpacing: 'tight',
    glyphOrientation: 'horizontal',
    gradientTransition: 0.9,
    inlineLabels: false,
    marqueeSelection: 'center',
  },
  minZoom: 0.01,
  selection: { color: 'rgb(255, 109, 102)', labelColor: 'white' },
};

export default { ANIMATION, COMBINE, LAYOUT, OPTIONS };
