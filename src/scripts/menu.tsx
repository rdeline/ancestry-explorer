import * as React from 'react';
import { tree } from './store';
import { GedcomNode } from 'parse-gedcom';

export class Menu extends React.Component {
    constructor(props: {}) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
    }

    private onFileChange(evt: React.ChangeEvent<HTMLInputElement>) {
        const input = evt.target;
        if (!input || !input.files || !input.files.length) return;
        var reader = new FileReader();
        reader.onload = () => {
            var text = reader.result;
            tree.load(text as string);
        };
        reader.readAsText(input.files[0]);
    }

    public render() {
        return (
            <div>
                <input type='file' accept='*.ged' onChange={this.onFileChange} />
            </div>
        );
    }
}