## ModelDrop ##

ModelDrop is a social platform for fashion models, photographers and agencies to connect and further their careers.


#### Technologies ####

- NodeJS/ Express
- MongoDB/ Mongoose
- AngularJS


#### Local Requirements ####

- Node/ NPM
- Gulp
- Bower
- Imagemagick
- Nodemon (optional)


#### Suggested Development Process ####

1. Pull 'master' branch
2. Pull recent dataset
	- See 'Download Current Dataset' below
2. Install dependencies
	- Node Modules
	- Bower Components
3. Start local processes
	- Nodemon
	- Gulp
4. Create feature branch
4. Make changes 
5. Commit changes
5. Merge feature branch to master
6. Push to 'master' branch
7. Well done – take a nap

#### Download Current Dataset ####

The MongoDB dataset for ModelDrop is backed up hourly on the remote server. Before developing locally, it's nice to have a fresh copy of the data to work against. Below is a common way to copy the remote backup and import the dataset to your local machine.

```
	// 1. Copy mongodump file from remote server to local machine
	scp root@107.170.194.72:/modeldrop/data_backup/mongodump.zip ~/Desktop
	// Pass: mebgxewsluzd

	// 2. Unzip and import dataset to local machine
	mongorestore --db modeldrop ~/Desktop/modeldrop
```







