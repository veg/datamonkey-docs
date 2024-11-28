To build PDF, you must have pandoc and LaTeX installed. Issue the following command:
`pandoc -s -S --toc -V geometry:margin=1in -o json-fields.pdf json-fields.md`