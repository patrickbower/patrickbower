# Patrick Bower

Personal website

### Prerequisites

- NodeJS
- Ruby

### Installing

- CL run `npm install` for dependencies.
- CL run `jekyll serve` to create serve dir, build files and start server.
- CL run `grunt develop` to build assets.

## Deployment

- git commit -am "Save local changes"
- git checkout -B gh-pages
- git add -f build
- git commit -am "Rebuild website"
- git filter-branch -f --prune-empty --subdirectory-filter build
- git push -f origin gh-pages
- git checkout

## Built With

[Jekyll](https://jekyllrb.com/)
[Grunt](https://gruntjs.com/)

## Contributing

Open for public observation only.

## Versioning

2.0.0

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
