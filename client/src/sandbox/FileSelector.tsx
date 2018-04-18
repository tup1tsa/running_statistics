import * as React from 'react';

export class FileSelector extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (selectorFiles: FileList | null) {
    if (selectorFiles === null) {
      return;
    }
    let reader = new FileReader();
    reader.onload = function() {
      // tslint:disable-next-line no-console
      console.log(reader.result);
    };
    reader.readAsText(selectorFiles[0]);
  }

  render () {
    return (
      <div>
        <input type="file" onChange={(e) => this.handleChange(e.target.files)} />
      </div>
    );
  }
}