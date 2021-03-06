Meteor.startup(function () {
  if(Meteor.users.find().count() === 0) {
    console.log('Adding in users...');
    var moe = Accounts.createUser({username:'moe',password:'secret',profile:{name:'Moe Howard',manager:false}});
    var larry = Accounts.createUser({username:'larry',password:'secret',profile:{name:'Larry Fine',manager:false}});
    var curly = Accounts.createUser({username:'curly',password:'secret',profile:{name:'Curly Howard',staffIds:[{staffId: moe}, {staffId: larry}],manager:true}});
     
    console.log('Adding in tasks...');   
    Meteor.call("createTask", {
      name:"Frozen Treat Machines",
      status: "Y",
      subtasks:[
        {order:1,status:"Y",name:"Install gaskets"},
        {order:2,status:"Y",name:"Install mixer blades"},
        {order:3,status:"Y",name:"Fill flavor units"},
        {order:4,status:"Y",name:"Turn on, check freezer unit"}
      ],
      managerId: curly,
      staffId:"unassigned"
    });
                                                                                                        
    Meteor.call("createTask", {
      name:"Open Registers",
      status: "Y",
      subtasks:[
        {order:1,status:"Y",name:"Turn on all terminals"},
        {order:2,"status":"Y",name:"Balance out cash trays"},
        {order:3,"status":"Y",name:"Check in promo codes"},
        {order:4,"status":"Y",name:"Check register promo placards"}
      ],
      managerId:curly,
      staffId:moe
    });
                                                    
    Meteor.call("createTask", {
      name:"Freezer Area",
      status: "Y",
      subtasks:[
        {order:1,status:"Y",name:"Unlock freezer"},
        {order:2,status:"Y",name:"Check daily stock"},
        {order:3,status:"Y",name:"Rotate stock"}
      ],
      managerId:curly,
      staffId:"unassigned"
    });
                                                    
    Meteor.call("createTask", {
      name:"Fryer Area",
      status: "Y",
      subtasks:[
        {order:1,status:"Y",name:"Check overnight maintenance status"},
        {order:2,status:"Y",name:"Check oil sump connections"},
        {order:3,status:"Y",name:"Turn on, set temperature"}
      ],
      managerId:curly,
      staffId:moe
    });
                                                    
    Meteor.call("createTask", {
      name:"Open Dining Room",
      status: "Y",
      subtasks:[
        {order:1,status:"Y",name:"Clean all tables"},
        {order:2,status:"Y",name:"Clean main floor"},
        {order:3,status:"Y",name:"Stock condiments"},
        {order:4,status:"Y",name:"Check / replenish trays"}
      ],
      managerId:curly,
      staffId:larry
    });    
  }
});