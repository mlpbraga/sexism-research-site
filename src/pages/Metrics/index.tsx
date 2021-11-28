import React from 'react';

const { innerWidth: width, innerHeight: height } = window;
const Metrics: React.FC = () => (
  <iframe
    title="DataStudio"
    width={width - 1}
    height={height - 4}
    src="https://datastudio.google.com/embed/reporting/ecd2d7b8-ea4c-4fce-abd1-d7f60646596e/page/fGnhB"
    frameBorder="0"
    allowFullScreen
  />
);

export default Metrics;
