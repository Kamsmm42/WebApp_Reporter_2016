define({ "api": [
  {
    "type": "delete",
    "url": "/comments/:id",
    "title": "Delete data of a comment",
    "version": "0.1.0",
    "name": "DeleteComment",
    "group": "Comment",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "description": "<p>This function for delete a comment</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The Comment-ID.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can delete the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CommentNotFound",
            "description": "<p>The <code>id</code> of the Comment was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 404 NoAccessRight\n{\n  \"error\": \"Comment can not delete. You haven't the right\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/comment.js",
    "groupTitle": "Comment"
  },
  {
    "type": "get",
    "url": "/comments/:id",
    "title": "Read data of a all Comments",
    "version": "0.1.0",
    "name": "GetAllComment",
    "group": "Comment",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>This function read a specific all Comments .</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment.authorname",
            "description": "<p>comment authorname.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment.text",
            "description": "<p>comment Description.</p>"
          },
          {
            "group": "Success 200",
            "type": "Img",
            "optional": false,
            "field": "comment.date",
            "description": "<p>comment image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment.email",
            "description": "<p>comment email.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "comment.telephone",
            "description": "<p>comment telephone.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment.issueId",
            "description": "<p>comment issueId.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CommentNotFound",
            "description": "<p>The <code>id</code> of the Comment was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Not Authenticated\n{\n  \"error\": \"NoAccessRight\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/comment.js",
    "groupTitle": "Comment"
  },
  {
    "type": "get",
    "url": "/comments/:id",
    "title": "Read data of a Comment",
    "version": "0.1.0",
    "name": "GetComment",
    "group": "Comment",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>This function read a specific Comment with his id.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment.authorname",
            "description": "<p>comment authorname.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment.text",
            "description": "<p>comment Description.</p>"
          },
          {
            "group": "Success 200",
            "type": "Img",
            "optional": false,
            "field": "comment.date",
            "description": "<p>comment image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment.email",
            "description": "<p>comment email.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "comment.telephone",
            "description": "<p>comment telephone.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment.issueId",
            "description": "<p>comment issueId.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"authorname\":        \"Kevin\",\n  \"text\":              \"C'est pas cool\",\n  \"date\":              \"12.10.2014\",\n  \"email\":             \"cestdurelavie@hotmail.com\",\n  \"telephone\":         \"000333222\",\n  \"issueId\":           \"gdvergdb\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CommentNotFound",
            "description": "<p>The <code>id</code> of the Comment was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"comment not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/comment.js",
    "groupTitle": "Comment"
  },
  {
    "type": "post",
    "url": "/api/comments",
    "title": "Create a new Comment",
    "version": "0.1.0",
    "name": "PostComment",
    "group": "Comment",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Create a new comment only if you're a staff member or you enter a email / telephone.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The new Comment-ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment.authorname",
            "description": "<p>comment authorname.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment.text",
            "description": "<p>comment Description.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "comment.date",
            "description": "<p>comment image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment.email",
            "description": "<p>comment email.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "comment.telephone",
            "description": "<p>comment telephone.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment.issueId",
            "description": "<p>comment issueId.</p>"
          }
        ]
      }
    },
    "filename": "app/controllers/comment.js",
    "groupTitle": "Comment"
  },
  {
    "type": "put",
    "url": "/comments/:id",
    "title": "Change a comment",
    "version": "0.1.0",
    "name": "PutComment",
    "group": "Comment",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "description": "<p>This function change a comment</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The Comment-ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment.authorname",
            "description": "<p>comment authorname.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment.text",
            "description": "<p>comment Description.</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "comment.date",
            "description": "<p>comment image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment.email",
            "description": "<p>comment email.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "comment.telephone",
            "description": "<p>comment telephone.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment.issueId",
            "description": "<p>comment issueId.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can change the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CommentNotFound",
            "description": "<p>The <code>id</code> of the comment was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 404 NoAccessRight\n{\n  \"error\": \"Comment can not change. You haven't the right\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/comment.js",
    "groupTitle": "Comment"
  },
  {
    "type": "delete",
    "url": "/issues/:id",
    "title": "Delete data of a Issue",
    "version": "0.1.0",
    "name": "DeleteIssue",
    "group": "Issue",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "description": "<p>This function for delete a Issue</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The Issue-ID.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can delete the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "IssueNotFound",
            "description": "<p>The <code>id</code> of the Issue was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 404 NoAccessRight\n{\n  \"error\": \"This issue can not delete. You haven't the right\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/issue.js",
    "groupTitle": "Issue"
  },
  {
    "type": "get",
    "url": "/issues/:id",
    "title": "Read data of all Issues",
    "version": "0.1.0",
    "name": "GetAllIssues",
    "group": "Issue",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>This function read a specific all Staff.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type.authorname",
            "description": "<p>Issue authorname.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type.description",
            "description": "<p>Issue Description.</p>"
          },
          {
            "group": "Success 200",
            "type": "Img",
            "optional": false,
            "field": "type.img_url",
            "description": "<p>Issue image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type.tags",
            "description": "<p>Issue tags.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type.email",
            "description": "<p>Issue email.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "type.telephone",
            "description": "<p>Issue telephone.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type.location",
            "description": "<p>Issue location. *</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"authorname\": \"Jerome\",\n \"description\": \"dégradation de mur\",\n \"image\": \"mur.png\",\n \"tags\": \"graffiti\",\n \"location\": \"Yverdon\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "IssueNotFound",
            "description": "<p>The <code>id</code> of the Issue was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Issue not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/issue.js",
    "groupTitle": "Issue"
  },
  {
    "type": "get",
    "url": "/issues/:id",
    "title": "Read data of an Issue",
    "version": "0.1.0",
    "name": "GetIssue",
    "group": "Issue",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>This function read a specific Issue with his id.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The Issue-ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type.authorname",
            "description": "<p>Issue authorname.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type.description",
            "description": "<p>Issue Description.</p>"
          },
          {
            "group": "Success 200",
            "type": "Img",
            "optional": false,
            "field": "type.img_url",
            "description": "<p>Issue image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type.tags",
            "description": "<p>Issue tags.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type.email",
            "description": "<p>Issue email.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "type.telephone",
            "description": "<p>Issue telephone.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type.location",
            "description": "<p>Issue location.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"authorname\": \"Jerome\",\n \"description\": \"dégradation de mur\",\n \"image\": \"mur.png\",\n \"tags\": \"graffiti\",\n \"email\": \"Jerome@gml.com\",\n \"telephone\": \"0404848373\",\n \"location\": \"Yverdon\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "IssueNotFound",
            "description": "<p>The <code>id</code> of the Issue was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Issue not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/issue.js",
    "groupTitle": "Issue"
  },
  {
    "type": "post",
    "url": "/api/issues",
    "title": "Create a new Issue",
    "version": "0.1.0",
    "name": "PostIssue",
    "group": "Issue",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Create a new Issue only if you're a staff member or you enter a email / telephone.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type.authorname",
            "description": "<p>Issue authorname.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type.description",
            "description": "<p>Issue Description.</p>"
          },
          {
            "group": "Success 200",
            "type": "Img",
            "optional": false,
            "field": "type.img_url",
            "description": "<p>Issue image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type.tags",
            "description": "<p>Issue tags.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type.email",
            "description": "<p>Issue email.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "type.telephone",
            "description": "<p>Issue telephone.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type.location",
            "description": "<p>Issue location.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"authorname\": \"Jerome\",\n \"description\": \"dégradation de mur\",\n \"image\": \"mur.png\",\n \"tags\": \"graffiti\",\n \"email\": \"Jerome@gml.com\",\n \"telephone\": \"0404848373\",\n \"location\": \"Yverdon\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/issue.js",
    "groupTitle": "Issue"
  },
  {
    "type": "put",
    "url": "/issues/:id",
    "title": "Change a Issue",
    "version": "0.1.0",
    "name": "PutIssue",
    "group": "Issue",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "description": "<p>This function change a issue</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The Issue-ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type.authorname",
            "description": "<p>Issue authorname.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type.description",
            "description": "<p>Issue Description.</p>"
          },
          {
            "group": "Success 200",
            "type": "Img",
            "optional": false,
            "field": "type.img_url",
            "description": "<p>Issue image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type.tags",
            "description": "<p>Issue tags.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type.email",
            "description": "<p>Issue email.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "type.telephone",
            "description": "<p>Issue telephone.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type.location",
            "description": "<p>Issue location.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can change the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TypeNotFound",
            "description": "<p>The <code>id</code> of the Issue was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 404 NoAccessRight\n{\n  \"error\": \"Issue can not change. You haven't the right\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/issue.js",
    "groupTitle": "Issue"
  },
  {
    "type": "delete",
    "url": "/staffs/:id",
    "title": "Delete data of a Staff",
    "version": "0.1.0",
    "name": "DeleteStaff",
    "group": "Staff",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "description": "<p>This function for delete a Staff</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The Staff-ID.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can delete the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "StaffNotFound",
            "description": "<p>The <code>id</code> of the Staff was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 404 NoAccessRight\n{\n  \"error\": \"Staff can not delete. You haven't the right\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/staff.js",
    "groupTitle": "Staff"
  },
  {
    "type": "get",
    "url": "/staffs/:id",
    "title": "Read data of all Staff",
    "version": "0.1.0",
    "name": "GetAllStaff",
    "group": "Staff",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>This function read a specific all Staff.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "staff.name",
            "description": "<p>Staff Name.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"name\":        \"Kevin\", \n  \"name\":        \"Jorde\", \n  \"name\":        \"Alice\", \n  \"name\":        \"Nico\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "StaffNotFound",
            "description": "<p>The <code>id</code> of the Type was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Staff not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/staff.js",
    "groupTitle": "Staff"
  },
  {
    "type": "get",
    "url": "/staffs/:id",
    "title": "Read data of a Staff",
    "version": "0.1.0",
    "name": "GetStaff",
    "group": "Staff",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>This function read a specific Staff with his id.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The Staff-ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "staff.name",
            "description": "<p>Staff Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "staff.login",
            "description": "<p>Staff login.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "staff.password",
            "description": "<p>Staff password.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "staff.email",
            "description": "<p>Staff email.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "staff.telephone",
            "description": "<p>Staff telephone.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "staff.city",
            "description": "<p>Staff city.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"name\":        \"Kevin\",\n  \"login\":       \"Salut2016\",\n  \"password\":    \"12345\",\n  \"email\":       \"cestdurelavie@hotmail.com\",\n  \"telephone\":   \"000333222\",\n  \"city\":        \"Lausanne\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can change the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "StaffNotFound",
            "description": "<p>The <code>id</code> of the Type was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Staff not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/staff.js",
    "groupTitle": "Staff"
  },
  {
    "type": "post",
    "url": "/api/staffs",
    "title": "Create a new Staff",
    "version": "0.1.0",
    "name": "PostStaff",
    "group": "Staff",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "description": "<p>Create a new Staff only if you're a staff member.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "staff.name",
            "description": "<p>Staff Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "staff.login",
            "description": "<p>Staff login.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "staff.password",
            "description": "<p>Staff password.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "staff.email",
            "description": "<p>Staff email.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "staff.telephone",
            "description": "<p>Staff telephone.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "staff.city",
            "description": "<p>Staff city.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"name\":        \"Kevin\",\n  \"login\":       \"Salut2016\",\n  \"password\":    \"12345\",\n  \"email\":       \"cestdurelavie@hotmail.com\",\n  \"telephone\":   \"000333222\",\n  \"city\":        \"Lausanne\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can create the data.</p>"
          }
        ]
      }
    },
    "filename": "app/controllers/staff.js",
    "groupTitle": "Staff"
  },
  {
    "type": "put",
    "url": "/staffs/:id",
    "title": "Change a Staff",
    "version": "0.1.0",
    "name": "PutStaff",
    "group": "Staff",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "description": "<p>This function change a Staff</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The Staff-ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "staff.name",
            "description": "<p>Staff Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "staff.login",
            "description": "<p>Staff login.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "staff.password",
            "description": "<p>Staff password.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "staff.email",
            "description": "<p>Staff email.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "staff.telephone",
            "description": "<p>Staff telephone.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "staff.city",
            "description": "<p>Staff city.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can change the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "StaffNotFound",
            "description": "<p>The <code>id</code> of the Staff was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 404 NoAccessRight\n{\n  \"error\": \"Staff can not change. You haven't the right\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/staff.js",
    "groupTitle": "Staff"
  },
  {
    "type": "delete",
    "url": "/type/:id",
    "title": "Delete data of a type",
    "version": "0.1.0",
    "name": "DeleteType",
    "group": "Type",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "description": "<p>This function is for delete a type</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The Type-ID.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can delete the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TypeNotFound",
            "description": "<p>The <code>id</code> of the Type was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 404 NoAccessRight\n{\n  \"error\": \"Type can not delete. You haven't the right\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/type.js",
    "groupTitle": "Type"
  },
  {
    "type": "get",
    "url": "/type",
    "title": "Read data of all type",
    "version": "0.1.0",
    "name": "GetAllType",
    "group": "Type",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>This function read all the types.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type.name",
            "description": "<p>Option Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type.description",
            "description": "<p>Option Description.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TypeNotFound",
            "description": "<p>The <code>id</code> of the Type was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401 Not Authenticated\n{\n  \"error\": \"NoAccessRight\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/type.js",
    "groupTitle": "Type"
  },
  {
    "type": "get",
    "url": "/type/:id",
    "title": "Read data of a type",
    "version": "0.1.0",
    "name": "GetType",
    "group": "Type",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>This function read a specific type with is id.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Name of the Type.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type.name",
            "description": "<p>Option Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type.description",
            "description": "<p>Option Description.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"name\": \"graffiti\",\n  \"description\": \"dégradation de mur\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TypeNotFound",
            "description": "<p>The <code>id</code> of the Type was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Type not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/type.js",
    "groupTitle": "Type"
  },
  {
    "type": "post",
    "url": "/api/type",
    "title": "Create a new type",
    "version": "0.1.0",
    "name": "PostType",
    "group": "Type",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "description": "<p>Create a new type only if you're a staff member.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type.name",
            "description": "<p>Option Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type.description",
            "description": "<p>Option Description.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"name\": \"graffiti\",\n  \"description\": \"dégradation de mur\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can create the data.</p>"
          }
        ]
      }
    },
    "filename": "app/controllers/type.js",
    "groupTitle": "Type"
  },
  {
    "type": "put",
    "url": "/type/:id",
    "title": "Change a Type",
    "version": "0.1.0",
    "name": "PutType",
    "group": "Type",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "description": "<p>This function change a type</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The Type-ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type.name",
            "description": "<p>Option Name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type.description",
            "description": "<p>Option Description.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NoAccessRight",
            "description": "<p>Only authenticated Admins can change the data.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TypeNotFound",
            "description": "<p>The <code>id</code> of the Type was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 404 NoAccessRight\n{\n  \"error\": \"Type can not change. You haven't the right\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/type.js",
    "groupTitle": "Type"
  }
] });
