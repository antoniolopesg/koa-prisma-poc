# koa-poc

## About
This project was going to be a real project but it had its problems in the beginning and was discontinued so I decided to open it to the public as a proof of concept

## Run in development

```sh
# Install the dependencies
$ yarn

# Copy the envs
$ cp .env.example .env

# Run the docker to get a database container
$ docker-compose up -d

# Migrate the database
$ yarn prisma migrate dev

# Just run
$ yarn dev
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/antoniolopesg/koa-poc/issues)

## Author

**Antonio Lopes**

* [github/antoniolopesg](https://github.com/antoniolopesg)
* [twitter/moddexntc](https://twitter.com/moddexntc)

***

_This file was generated by [readme-generator](https://github.com/jonschlinkert/readme-generator) on June 19, 2022._