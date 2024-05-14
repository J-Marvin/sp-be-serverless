FROM public.ecr.aws/lambda/nodejs:18 as builder

WORKDIR ${LAMBDA_TASK_ROOT}

WORKDIR /usr/app

COPY package*.json ./
ADD . .

RUN npm ci
RUN npm run build

FROM public.ecr.aws/lambda/nodejs:18
WORKDIR ${LAMBDA_TASK_ROOT}

COPY package*.json ${LAMBDA_TASK_ROOT}/

RUN npm ci --omit=dev&& rm package-lock.json node_modules/.package-lock.json

COPY --from=builder /usr/app/dist ${LAMBDA_TASK_ROOT}

ENV NODE_ENV=development
ENV AWS_ACCESS_KEY_ID="key here"
ENV AWS_SECRET_ACCESS_KEY="secret access key here"

CMD ["lambda.handler"]
