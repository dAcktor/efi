FROM node:4-onbuild

# Set the working directory to
WORKDIR .

# Copy the current directory contents into the container 
ADD . /src

EXPOSE 9000

CMD ["node", "package.json"]

