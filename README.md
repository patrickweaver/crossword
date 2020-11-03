# Crossword

A crossword composer and game made with React, TypeScript, React Router, and Create React App.

Set up to be deployed to a subdirectory, with `/editor` and `/game` as additional subdirectories with the whole app to work around React Router issues. `copy.sh` file copies to my local static site generator.

## Notes

- Individual character underline: https://codepen.io/thebabydino/pen/mRrPwB


## Known Issues

- Because of differences in how the styled inputs are handled in different browsers the board inupts sometimes overlap 2 digit square numbers.
- There may be a bug that sometimes corrupts game state in game mode, but I haven't been able to reproduce.
