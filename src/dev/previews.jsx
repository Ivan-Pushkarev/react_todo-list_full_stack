import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import MessagesPage from "../pages/MessagesPage";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/MessagesPage">
                <MessagesPage/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;