import {createSelector} from 'reselect';

//selector
const selectDirectory = state => state.directory;

// createSelector: First argument, selectors. Second argument is a function called with the selectors as arguments.
export const selectDirectorySections = createSelector(
    [selectDirectory],
    directory => directory.sections
)