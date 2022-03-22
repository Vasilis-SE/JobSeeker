# JobSeeker

<p>
    A job add REST API that you can register, login, create a new company and for each company create new 
    job advertisements. Also you can handle all those data, change them and delete them.
</p>

<p>
    You can run all the unit tests of the backend code simply by going into
    /server and typing <code>npm run test</code>
</p>

<p>
    You can view a step by step guide on how to install and run the app
    below. Also you can view all the steps made the tasks on Github's 
    repository <code>Projects</code> tab (<code>https://github.com/Vasilis-SE/JobSeeker/projects/1</code>).
</p>

<p>
    Also all the Postman request to the API are provider in the folder <code>postman</code> in /server/postman.
</p>

<p>
    The current API also contains documentation (by using Open API standards) by venturing to 
    <code>http://localhost:3100/api/v1/documentation/#/</code> once the api is up and running.
    This documentation contains in depth analysis on how to request data from the end points, 
    what to expect, what errors can be returned as well as the available environments used.
</p>

## Technologies 

<p>
    Below are listed the technologies that are used.
</p>

<ol>
    <li> NodeJS </li>
    <li> Typescipt </li>
    <li> ExpressJS -> Framework for the RestAPI, to handle requests and send responses. </li>
    <li> Jest -> Testing framework of NodeJS. </li>
    <li> Jason Web Token (JWT) -> It is used for the authentication of users. </li>
    <li> Docker -> For dockerizing the app and install all the necessary tooling. </li>
    <li> PostgreSQL -> The database. </li>
    <li> PgAdmin -> Display database tool. </li>
    <li> Redis -> For caching JWT. </li>
    <li> Gulp -> For building the backend API code. </li>
    <li> ESLint -> For linting the backend code. </li>
    <li> redisinsight -> Tool to display stored Redis keys (it will be installed throught docker but you are not required to use it). </li>
</ol>

## Installation 

<p>
    Follow the steps bellow to install & run the application. The guide below will setup the 
    development environment, but its more or less the same for production. The only difference
    is that for production you will need to build the app first.
</p>

<ol>
    <li> Download repository <code>git@github.com:Vasilis-SE/JobSeeker.git</code> </li>
    <li> Change directory to /server </li>
    <li> 
        Run npm init, to initialize project and to install all dependencies 
        based on the package.json file.
    </li>
    <li> 
        You might need to install ts-node globally so execute 
        <code>npm install -g ts-node</code> 
    </li>
    <li> 
        To be on the same page and use exactly the same technologies, 
        database and tooling, docker is needed for setting up the project. 
        So you will need to download it and install it from 
        <a href="https://docs.docker.com/get-docker/"> here </a>.
    </li>
    <li> 
        Go to /server folder and run <code>npm run docker:build:dev</code> 
        to build your images.
    </li>
    <li> 
        After that on the /server folder run <code>npm run docker:up:dev</code> 
        to compose UP the image and to add them into a cointener.
    </li>
    <li> 
        Next you will need to import the database schema is located on 
        /server/database/schema folder. To do that, after the container is up and running
        (you will see it on docker user interface) open up a browser and type
        <code>localhost:8080</code> The port <code>8080</code> is the outbound
        port that the local machine is using to communicate with the images VM port
        to open <code>PgAdmin4</code> web user interface. There you can view the 
        database import/export the schema and display the content of the tables.
    </li>
    <li> 
        On <code>localhost:8080</code> you will be prompted to a login screen there 
        add the credentials listed on /src/config/env.dev file (PGADMIN_MAIL, PGADMIN_PASS).
    </li>
    <li> 
        You might need to create a new postgres server. <code>Right click on Servers</code>
        -> <code>Create</code> -> <code>Server...</code> -> 
        <code>Enter credentials of .env file (on Host name/address add the ip of your host machine)</code>
    </li>
    <li> 
        Import schema by clicking <code>Tools</code> on the top bar <code>Restore</code>,
        <code>Only Schema</code>, <code>Load file</code> and you are good to go.
    </li>
    <li> 
        On /server folder of the project run <code>npm run api:dev</code> to run restAPI.
    </li>
    <li> 
        You are good to go, venture into the app and test its functionalities!!!
    </li>
</ol>

## Future Updates/Tweaks

<p>
    All the future updates/tweak that can be made on the application as well as the whole
    development process and the task that were created, issues and so on are located on
    <a href="https://github.com/Vasilis-SE/JobSeeker/projects/1" target="_blank"> Github's Project Panel </a>
</p>

