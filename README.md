# pandoc-graphviz-filter
A pandoc filter rendering graphviz code in markdown to pdf
# Install

```
yarn install
```
Or

```
npm install
```

# Usage

```
pandoc -s  --pdf-engine=xelatex -o test.pdf -F index.js test.md
```
