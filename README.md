# ldtree-browser

ldtree-browser is a library that helps you navigate and query linked data trees.
This library follows the spec presented in https://github.com/pietercolpaert/TreeOntology.

## Installation

using npm:
`npm install ldtree-browser`
`const  ldtreeBrowser  =  require("ldtree-browser")`  

## TreeClient
A TreeClient object manages the execution of the queries 
A new TreeClient object can be created using
`var treeClient = new ldtreeBrowser.TreeClient(maxSubjects, maxAge)`
 - maxSubjects - Maximal amount of elements that can be stored in the cache 
	 - defaults to 10000
 - maxAge - Maximum duration an item can stay in the cache
	 - defaults to 5 minutes
	 - in milliseconds

Now with the TreeClient object created, we want to add one or multiple collections to our TreeClient.
`await treeclient.addCollection("https://example.org/collections/collection1.jsonld");`
`await treeclient.addCollection("https://example.org/collections/collection2.jsonld");`
Every query executed on an empty session, will use all the nodes described in the `hydra:view` of every collection to execute the query on.

The TreeClient object provides following interface to manupulate

## Sessions
Queries executed on the TreeClient always return a Promise\<Session\> object.
These session objects respresent the state in which the query execution halted.
The session object provides the following interface
 - `getNodes()` - Returns all the nodes contained in the session.
 - `getMembers()` - Returns all the data contained by the session nodes.
 - `getChildRelations()` - Returns all the childrelations reachable by the session nodes.
 - `size()` - Returns the amount of nodes contained by the session object.
 - `isEmpty()` - Returns true if the session contains nodes, else false.
 
## Using queries
A query on the TreeClient is executed by 

`let query  =  new ldtreeBrowser.LocationQuery(locationWKTString)`

The provided queries at this point are:
 - `LocationQuery` - Returns all the nodes contained in the session.
 - `KNNQuery()` - Returns all the data contained by the session nodes.
 - `SearchStringQuery()` - Returns all the childrelations reachable by the session nodes.
Extra queries can be added. See **Creating custom queries**

Information is emitted from the query in a streaming fashion.
Listeners can be added for following attributes using:
`query.on('attribute', async  function(e){});`

attribute list:
 - node - Emits every node encoutered during the execution of the query.
 - leafnode - Emits every leaf node of the query.
 - member - Emits all members encoutered in the leaf nodes of the query.

Using custom queries, extra attributes can be added.
### Executing queries
A query is executed using the following call:
`let session  = treeclient.executeQuery(query)`
The result is a session object, as seen in the part about **Session**.
When a query is continuing on a previous query, the session object returned by the previous query can be passed.

    let search_Ge = new ldtreeBrowser.SearchStringQuery("Ge")
    let search_nt = new ldtreeBrowser.SearchStringQuery("nt")
    let ge_session = await treeclient.executeQuery(search_Ge);
    let gnt_session = await treeclient.executeQuery(search_Ge, ge_session);
    
   Now we have executed the same query as 

    let search = new ldtreeBrowser.SearchStringQuery("Gent")
    let session = await treeclient.executeQuery(search);
  Both resulting in the node on the place of searchstring "Gent".
    
## Creating custom queries
There are two kinds of custom queries.

### General queries
The interface for general queries is the following:

    class MyQuery extends treeBrowser.Query{
		constructor () { super() }
		query() : Promise<Node>{}
	}
  
An example of the internal StringSearchQuery adn KNNQuery can be found here:
https://github.com/Dexagod/ldtree-browser/blob/master/src/query/SearchStringQuery.ts
https://github.com/Dexagod/ldtree-browser/blob/master/src/query/KNNQuery.ts
or in the module source code.


### Searchtree queries
Queries for search trees can use the specific superclass SearchtreeQuery.
This superclass incorporates all the logic needed to search the tree and emit the nodes, leafnodes and members.
It passes a 


    class MyQuery extends treeBrowser.SearchTreeQuery{
		constructor () { 
			super(emitcondition, followcondition)
		}
	}  
 
 
## Condition
Conditions are used in the Searchtree Query to check the nodes and relations on a specific condition.

### EmitCondition
The EmitCondition is a condition that is checked before emitting a node or emitting members of a specific node.

	class  MyEmitCondition  implements  EmitCondition {
		check_condition(node:Node, nodeContext) : boolean { ... }
	}
This method is called in the SearchTreeQuery.query() method, and the parameters are inserted there.
	
### FollowCondition
The FollowCondition is a condition that is checked to assert if a childrelation should be followed or not.

	class  MyEmitCondition  implements  FollowCondition {
		check_condition(node:Node, relation:ChildRelation, child:Node, nodeContext) : boolean { ... }
	}
This method is called in the SearchTreeQuery.query() method, and the correct parameters are inserted there.
The child node may not be fully loaded yet in the background. Checking the childrelations and/or members of the child node may cause a slight delay because this can fire a new http request for the requested object!


### And/OrCondition
These conditions are used to aggregate multiple conditions.

	new AndCondition(emitCondition1, emitCondition2);
	new OrCondition(followCondition1, followCondition2);

## Node
Node objects emitted or returned by session.getNodes() have the following interface:
 - `getValue()` - Returns the value of the node.
 - `getMembers()` - Returns all the data contained by the node.
 - `getChildRelations()` - Returns all the childrelations of the node.
 - `getTotalItems()` - Returns the amount of nodes contained under this node (not only direct children).


## ChildRelation
Node childrelations have the following interface:
 - `getChildren()` - Returns a promise of the child nodes - Promise\<Node\>
 - `getRelationType()` - Returns the type of the child relation.