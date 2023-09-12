FROM alpine
RUN apk add --no-cache git npm
RUN git clone https://github.com/lassewolpmann/f1-countdown-svelte-kit

WORKDIR "/f1-countdown-svelte-kit"

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["node", "build"]