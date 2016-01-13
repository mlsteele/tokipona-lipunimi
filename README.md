# Toki Pona - Lipu Nimi

A toki pona language reference to and from English.

Demo: [https://mlsteele.github.io/tokipona-lipunimi/](https://mlsteele.github.io/tokipona-lipunimi/)

This tool is intended to be a quick reference and helper for reading and translating texts between
toki pona and English. It should contain all commonly used words as well as some multi-word constructions,
idioms, and a few example sentences.

## Developing

Install node dependencies:
```shell
npm install
```

To run the webpack watcher run
```shell
webpack-dev-server --watch
```

Visit [http://localhost:8080/webpack-dev-server/](http://localhost:8080/webpack-dev-server/)

## Deploy

Run `./deploy` to run webpack and push to github pages.

Alternatively, just run `webpack` and then statically serve the repo directory.

## Contributing

Contributions are welcome!
Lipu li wile kama sona e toki pona tan sina!

To contribute improvements to the dictionary or suggest additional data sources,
feel free to do whichever of these is most convenient:
- Edit the database in `script/tokipona.js` and submit a PR.
- Create an issue with your suggestion and I will make the change to the database.

To contribute improvements to the code or styling, go ahead and submit a PR.

## Acknowledgements

Thanks to [Visual Toki Pona](https://github.com/x-raizor/visual-tokipona) from which I took `tokipona.json`.

Thanks to [Advanced Toki Pona on Memrise](http://www.memrise.com/course/443499/advanced-toki-pona/) for more words.
