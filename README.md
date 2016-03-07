# COMEM Web Services 2016 Project

Course: [https://github.com/SoftEng-HEIGVD/Teaching-HEIGVD-CM_WEBS-2016](https://github.com/SoftEng-HEIGVD/Teaching-HEIGVD-CM_WEBS-2016)

+---------------------+
+- Author Members : --+
+---------------------+
- Christopher de Guzman
- Kamel Evans

+---------------------+
+--- Description : ---+
+---------------------+
The "Web Reporter" API allows the creation and follow-up of Issues of a specific Type, with multiple Comments. The Comments can be created by "anonymous users" or registered Staff. The status of an Issue can be updated by one Staff, that is assigned to the Issue.
In order to have access to "Staff-only" actions, Staff must send their "staffIdentify" in the body.


+---------------------+
+--- Useful URLS : ---+
+---------------------+
/apidoc - API DOC

/api/issues
/api/issues/:id
/api/issues?tags=:tag1+:tag2+:tag3
/api/issues?orderByDate=:age
/api/issues?city=:cityname
/api/issues?startdate=:date1&enddate=:date2
/api/issues?status=:statusname
/api/issues?authorname=:authorname
/api/issues?typename=:type
/api/issues/:id/actions

/api/authors?order=:numberOfIssues
/api/staffs?issueStatus=:statusname&order=:numberOfIssues

/api/staffs/
/api/staffs/:id

/types
/types/:id
/types/:id

/issues/:id/comments
/issues/:id/comments/:id



