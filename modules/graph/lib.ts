import {JSONSet, EntitySet, Entity, Singleton, Pair} from "../modules/entity-set/lib";

// todo: implement `Graph.map()`.
// todo: implement `Graph.flatMap()`.
// todo: implement `Graph.zip()`.
// todo: fix inheritance issues.
// todo: move concrete class definition to `domain.ts`.
// todo: implement a conveniance dsl to modify edge structure (without manual add+delete relinking).

export namespace json {
    export type Id = string
    export type URL = string
    export type Email = string

    export interface Node<A> {
        type:string
        props:A
    }

    export namespace node {
        export type ALL = TechnologyCategory | Technology | Year | Opportunity | Risk | Company | Person | Country | City | LayoutRectangle;

        export interface TechnologyCategory {
            name:string
        }
        export interface Technology {
            name:string
            description:string
        }
        export interface Year {
            number:number
        }
        export interface Opportunity {
            name:string
            description:string
        }
        export interface Risk {
            name:string
            description:string
            existential:boolean
        }
        export interface Company {
            name:string
            description:string
            logo:URL
            email:Email
            website:URL
            facebook:URL
            linkedin:URL
        }
        export interface Person {
            firstName:string
            lastName:string
            description:string
            photo:URL
            email:Email
            website:URL
            facebook:URL
            linkedin:URL
        }
        export interface Country {
            name:string
        }
        export interface City {
            name:string
        }
        export interface LayoutRectangle {
            x:number
            y:number
            width:number
            height:number
        }
    }

    export interface Edge<A> {
        type:string
        props:A
        head:Id
        tail:Id
    }

    export namespace edge {
        export type ALL = Contains | Enables | Disrupts | HasSubTechnology | AdoptedIn | AbandonedIn | Provides | Creates | AtRiskOf | RealizedIn | EmergesIn | LocatedAt | AssociatedWith | CollaboratesWith | LaidOut;

        export interface Contains {
        }
        export interface Enables {
        }
        export interface Disrupts {
        }
        export interface HasSubTechnology {
        }
        export interface AdoptedIn {
        }
        export interface AbandonedIn {
        }
        export interface Provides {
        }
        export interface Creates {
        }
        export interface AtRiskOf {
        }
        export interface RealizedIn {
        }
        export interface EmergesIn {
        }
        export interface LocatedAt {
        }
        export interface AssociatedWith {
        }
        export interface CollaboratesWith {
        }
        export interface LaidOut {
        }
    }


    export interface Graph {
        nodes: graph.Nodes
        edges: graph.Edges
    }

    export namespace graph {
        export type Nodes = JSONSet<Node<node.ALL>>
        export type Edges = JSONSet<Edge<edge.ALL>>
    }
}

export namespace entity {
    abstract class Node<A> extends Entity<json.Node<A>> {
        get type() {
            return this.json.type;
        }

        get props() {
            return this.json.props;
        }
    }

    abstract class Edge<A> extends Entity<json.Edge<A>> {
        get type() {
            return this.json.type;
        }

        get props() {
            return this.json.props;
        }

        get head() {
            return this.json.head;
        }

        get tail() {
            return this.json.tail;
        }
    }

    export namespace node {
        export type ALL = TechnologyCategory | Technology | Year | Opportunity | Risk | Company | Person | Country | City | LayoutRectangle;

        export class TechnologyCategory extends Node<json.node.TechnologyCategory> {
            static get type() {
                return "TechnologyCategory";
            }
        }
        export class Technology extends Node<json.node.Technology> {
            static get type() {
                return "Technology";
            }
        }
        export class Year extends Node<json.node.Year> {
            static get type() {
                return "Year";
            }
        }
        export class Opportunity extends Node<json.node.Opportunity> {
            static get type() {
                return "Opportunity";
            }
        }
        export class Risk extends Node<json.node.Risk> {
            static get type() {
                return "Risk";
            }
        }
        export class Company extends Node<json.node.Company> {
            static get type() {
                return "Company";
            }
        }
        export class Person extends Node<json.node.Person> {
            static get type() {
                return "Person";
            }
        }
        export class Country extends Node<json.node.Country> {
            static get type() {
                return "Country";
            }
        }
        export class City extends Node<json.node.City> {
            static get type() {
                return "City";
            }
        }
        export class LayoutRectangle extends Node<json.node.LayoutRectangle> {
            static get type() {
                return "LayoutRectangle";
            }
        }
    }

    export namespace edge {
        export type ALL = Contains | Enables | Disrupts | HasSubTechnology | AdoptedIn | AbandonedIn | Provides | Creates | AtRiskOf | RealizedIn | EmergesIn | LocatedAt | AssociatedWith | CollaboratesWith | LaidOut;

        export class Contains extends Edge<json.edge.Contains> {
            static get type() {
                return "Contains";
            }
        }
        export class Enables extends Edge<json.edge.Enables> {
            static get type() {
                return "Enables";
            }
        }
        export class Disrupts extends Edge<json.edge.Disrupts> {
            static get type() {
                return "Disrupts";
            }
        }
        export class HasSubTechnology extends Edge<json.edge.HasSubTechnology> {
            static get type() {
                return "HasSubTechnology";
            }
        }
        export class AdoptedIn extends Edge<json.edge.AdoptedIn> {
            static get type() {
                return "AdoptedIn";
            }
        }
        export class AbandonedIn extends Edge<json.edge.AbandonedIn> {
            static get type() {
                return "AbandonedIn";
            }
        }
        export class Provides extends Edge<json.edge.Provides> {
            static get type() {
                return "Provides";
            }
        }
        export class Creates extends Edge<json.edge.Creates> {
            static get type() {
                return "Creates";
            }
        }
        export class AtRiskOf extends Edge<json.edge.AtRiskOf> {
            static get type() {
                return "AtRiskOf";
            }
        }
        export class RealizedIn extends Edge<json.edge.RealizedIn> {
            static get type() {
                return "RealizedIn";
            }
        }
        export class EmergesIn extends Edge<json.edge.EmergesIn> {
            static get type() {
                return "EmergesIn";
            }
        }
        export class LocatedAt extends Edge<json.edge.LocatedAt> {
            static get type() {
                return "LocatedAt";
            }
        }
        export class AssociatedWith extends Edge<json.edge.AssociatedWith> {
            static get type() {
                return "AssociatedWith";
            }
        }
        export class CollaboratesWith extends Edge<json.edge.CollaboratesWith> {
            static get type() {
                return "CollaboratesWith";
            }
        }
        export class LaidOut extends Edge<json.edge.LaidOut> {
            static get type() {
                return "LaidOut";
            }
        }
    }

    type JSONNode = json.Node<json.node.ALL>
    type JSONEdge = json.Edge<json.edge.ALL>

    type EntityNode = Node<json.node.ALL>
    type EntityEdge = Edge<json.edge.ALL>

    export class Graph {
        static empty():Graph {
            return Graph.fromJSON({nodes: {}, edges: {}});
        }

        static fromJSON(graph:json.Graph):Graph {
            return new Graph(new Pair(
                new Singleton(Object.keys(graph.nodes).reduce((hash, id) => {
                    let json = graph.nodes[id];
                    switch (json.type) {
                        case node.TechnologyCategory.type:
                            hash[id] = new node.TechnologyCategory(<json.Node<json.node.TechnologyCategory>>json);
                            break;
                        case node.Technology.type:
                            hash[id] = new node.Technology(<json.Node<json.node.Technology>>json);
                            break;
                        case node.Year.type:
                            hash[id] = new node.Year(<json.Node<json.node.Year>>json);
                            break;
                        case node.Opportunity.type:
                            hash[id] = new node.Opportunity(<json.Node<json.node.Opportunity>>json);
                            break;
                        case node.Risk.type:
                            hash[id] = new node.Risk(<json.Node<json.node.Risk>>json);
                            break;
                        case node.Company.type:
                            hash[id] = new node.Company(<json.Node<json.node.Company>>json);
                            break;
                        case node.Person.type:
                            hash[id] = new node.Person(<json.Node<json.node.Person>>json);
                            break;
                        case node.Country.type:
                            hash[id] = new node.Country(<json.Node<json.node.Country>>json);
                            break;
                        case node.City.type:
                            hash[id] = new node.City(<json.Node<json.node.City>>json);
                            break;
                        case node.LayoutRectangle.type:
                            hash[id] = new node.LayoutRectangle(<json.Node<json.node.LayoutRectangle>>json);
                            break;
                        default:
                            throw new Error("UNREACHABLE!");
                    }
                    return hash;
                }, <EntitySet<JSONNode>>{})),
                new Singleton(Object.keys(graph.edges).reduce((hash, id) => {
                    let json = graph.edges[id];
                    switch (json.type) {
                        case edge.Contains.type:
                            hash[id] = new edge.Contains(<json.Edge<json.edge.Contains>>json);
                            break;
                        case edge.Enables.type:
                            hash[id] = new edge.Enables(<json.Edge<json.edge.Enables>>json);
                            break;
                        case edge.Disrupts.type:
                            hash[id] = new edge.Disrupts(<json.Edge<json.edge.Disrupts>>json);
                            break;
                        case edge.HasSubTechnology.type:
                            hash[id] = new edge.HasSubTechnology(<json.Edge<json.edge.HasSubTechnology>>json);
                            break;
                        case edge.AdoptedIn.type:
                            hash[id] = new edge.AdoptedIn(<json.Edge<json.edge.AdoptedIn>>json);
                            break;
                        case edge.AbandonedIn.type:
                            hash[id] = new edge.AbandonedIn(<json.Edge<json.edge.AbandonedIn>>json);
                            break;
                        case edge.Provides.type:
                            hash[id] = new edge.Provides(<json.Edge<json.edge.Provides>>json);
                            break;
                        case edge.Creates.type:
                            hash[id] = new edge.Creates(<json.Edge<json.edge.Creates>>json);
                            break;
                        case edge.AtRiskOf.type:
                            hash[id] = new edge.AtRiskOf(<json.Edge<json.edge.AtRiskOf>>json);
                            break;
                        case edge.RealizedIn.type:
                            hash[id] = new edge.RealizedIn(<json.Edge<json.edge.RealizedIn>>json);
                            break;
                        case edge.EmergesIn.type:
                            hash[id] = new edge.EmergesIn(<json.Edge<json.edge.EmergesIn>>json);
                            break;
                        case edge.LocatedAt.type:
                            hash[id] = new edge.LocatedAt(<json.Edge<json.edge.LocatedAt>>json);
                            break;
                        case edge.AssociatedWith.type:
                            hash[id] = new edge.AssociatedWith(<json.Edge<json.edge.AssociatedWith>>json);
                            break;
                        case edge.CollaboratesWith.type:
                            hash[id] = new edge.CollaboratesWith(<json.Edge<json.edge.CollaboratesWith>>json);
                            break;
                        case edge.LaidOut.type:
                            hash[id] = new edge.LaidOut(<json.Edge<json.edge.LaidOut>>json);
                            break;
                        default:
                            throw new Error("UNREACHABLE!");
                    }

                    return hash;
                }, <EntitySet<JSONEdge>>{}))
            ));
        }

        constructor(private pair:Pair<JSONNode, JSONEdge>) {
        }

        get nodeIds():json.Id[] {
            return this.pair.ids$1;
        }

        get edgeIds():json.Id[] {
            return this.pair.ids$2;
        }

        get nodeTypes():string[] {
            return Object.keys(this.nodeIterator.reduce((types, [_, {type}]) => {
                types[type] = true;
                return types;
            }, <{[id:string]:boolean}>{})).sort();
        }

        get edgeTypes():string[] {
            return Object.keys(this.edgeIterator.reduce((types, [_, {type}]) => {
                types[type] = true;
                return types;
            }, <{[id:string]:boolean}>{})).sort();
        }

        hasNode(id:json.Id):boolean {
            return this.pair.has$1(id);
        }

        hasEdge(id:json.Id):boolean {
            return this.pair.has$2(id);
        }

        node(id:json.Id):EntityNode {
            return <EntityNode>this.pair.value$1(id);
        }

        edge(id:json.Id):EntityEdge {
            return <EntityEdge>this.pair.value$2(id);
        }

        edgesOfNode(nodeId:json.Id):{in_:[json.Id, EntityEdge][], out:[json.Id, EntityEdge][]} {
            return this.edgeIterator.reduce((edgesOfNode, [edgeId, edge]) => {
                if (edge.head === nodeId) {
                    edgesOfNode.in_.push([edgeId, edge]);
                } else if (edge.tail === nodeId) {
                    edgesOfNode.out.push([edgeId, edge]);
                }
                return edgesOfNode;
            }, {in_: [], out: []});
        }

        get nodeIterator():[json.Id, EntityNode][] {
            return <[json.Id, EntityNode][]>this.pair.iterator$1;
        }

        get edgeIterator():[json.Id, EntityEdge][] {
            return <[json.Id, EntityEdge][]>this.pair.iterator$2;
        }

        nodeReduce<A>(f:(z:A, x:[json.Id, EntityNode]) => A, z:A):A {
            return this.nodeIterator.reduce(f, z);
        }

        edgeReduce<A>(f:(z:A, x:[json.Id, EntityEdge]) => A, z:A):A {
            return this.edgeIterator.reduce(f, z);
        }

        nodeFilter(f:(x:[json.Id, EntityNode]) => boolean):Graph {
            return new Graph(new Pair(
                new Singleton(this.nodeIterator.reduce((nodes, [id, node]) => {
                    if (f([id, node])) {
                        nodes[id] = node;
                    }
                    return nodes;
                }, <EntitySet<JSONNode>>{})),
                new Singleton(this.edgeIterator.reduce((edges, [id, edge]) => {
                    edges[id] = edge;
                    return edges;
                }, <EntitySet<JSONEdge>>{}))
            ));
        }

        edgeFilter(f:(x:[json.Id, EntityEdge]) => boolean):Graph {
            return new Graph(new Pair(
                new Singleton(this.nodeIterator.reduce((nodes, [id, node]) => {
                    nodes[id] = node;
                    return nodes;
                }, <EntitySet<JSONNode>>{})),
                new Singleton(this.edgeIterator.reduce((edges, [id, edge]) => {
                    if (f([id, edge])) {
                        edges[id] = edge;
                    }
                    return edges;
                }, <EntitySet<JSONEdge>>{}))
            ));
        }

        equals(that:Graph):boolean {
            return this.pair.equals(that.pair);
        }

        intersects(that:Graph):boolean {
            return this.pair.intersects(that.pair);
        }

        contains(that:Graph):boolean {
            return this.pair.contains(that.pair);
        }

        isEmpty():boolean {
            return this.nodeIds.length + this.edgeIds.length === 0;
        }

        plus(that:Graph):Graph {
            return new Graph(this.pair.plus(that.pair));
        }

        minus(that:Graph):Graph {
            return new Graph(this.pair.minus(that.pair));
        }

        star(that:Graph):Graph {
            return new Graph(this.pair.star(that.pair));
        }

        withoutDanglingNodes():Graph {
            let existingNodeIds = this.edgeIterator.reduce((existingNodeIds, [id, edge]) => {
                existingNodeIds[edge.head] = true;
                existingNodeIds[edge.tail] = true;
                return existingNodeIds;
            }, <{[id:string]:boolean}>{});
            return this.nodeFilter(([id, node]) => {
                return id in existingNodeIds;
            });
        }

        withoutDanglingEdges():Graph {
            return this.edgeFilter(([id, edge]) => {
                return this.hasNode(edge.head) && this.hasNode(edge.tail);
            });
        }

        flatten():Graph {
            return Graph.fromJSON(this.toJSON());
        }

        toJSON():json.Graph {
            let {$1, $2} = this.pair.toJSON();
            return {nodes: $1, edges: $2};
        }

        slice():GraphSlice {
            return new GraphSlice(this);
        }
    }

    export class GraphSlice {
        constructor(private graph:Graph) {
        }

        nodes():NodeSlice {
            return new NodeSlice(this.graph, graph => {
                return graph.nodeIterator;
            });
        }

        edges():EdgeSlice {
            return new EdgeSlice(this.graph, graph => {
                return graph.edgeIterator;
            });
        }
    }

    let andThen = <A, B, C>(f:(a:A) => B, g:(b:B) => C) => (a:A):C => g(f(a));

    export class NodeSlice {
        constructor(private graph:Graph, private slice:(graph:Graph) => [json.Id, EntityNode][]) {
        }

        ofType(type:string):NodeSlice {
            return new NodeSlice(this.graph, andThen(this.slice, nodes => {
                return nodes.filter(([id, node]) => node.type === type);
            }));
        }

        filter(f:(_:[json.Id, EntityNode]) => boolean):NodeSlice {
            return new NodeSlice(this.graph, andThen(this.slice, nodes => {
                return nodes.filter(f);
            }));
        }

        find(f:(_:[json.Id, EntityNode]) => boolean):NodeSlice {
            return new NodeSlice(this.graph, andThen(this.slice, nodes => {
                return nodes.filter(f).slice(0, 1);
            }));
        }

        in(f:(_:[json.Id, EntityEdge]) => boolean):NodeSlice {
            return new NodeSlice(this.graph, andThen(this.slice, nodes => {
                return Array.prototype.concat.apply([], nodes.map(([nid, node]) => {
                    return this.graph.edgeIterator
                        .filter(([eid, edge]) => f([eid, edge]) && edge.head === nid)
                        .map(([eid, edge]) => [edge.tail, this.graph.node(edge.tail)]);
                }));
            }));
        }

        inE(f:(_:[json.Id, EntityEdge]) => boolean):EdgeSlice {
            return new EdgeSlice(this.graph, andThen(this.slice, nodes => {
                return Array.prototype.concat.apply([], nodes.map(([nid, node]) => {
                    return this.graph.edgeIterator
                        .filter(([eid, edge]) => f([eid, edge]) && edge.head === nid);
                }));
            }));
        }

        out(f:(_:[json.Id, EntityEdge]) => boolean):NodeSlice {
            return new NodeSlice(this.graph, andThen(this.slice, nodes => {
                return Array.prototype.concat.apply([], nodes.map(([nid, node]) => {
                    return this.graph.edgeIterator
                        .filter(([eid, edge]) => f([eid, edge]) && edge.tail === nid)
                        .map(([eid, edge]) => [edge.head, this.graph.node(edge.head)]);
                }));
            }));
        }

        outE(f:(_:[json.Id, EntityEdge]) => boolean):EdgeSlice {
            return new EdgeSlice(this.graph, andThen(this.slice, nodes => {
                return Array.prototype.concat.apply([], nodes.map(([nid, node]) => {
                    return this.graph.edgeIterator
                        .filter(([eid, edge]) => f([eid, edge]) && edge.tail === nid);
                }));
            }));
        }

        map<A>(f:(_:[json.Id, EntityNode]) => A):A[] {
            return this.slice(this.graph).map(f);
        }

        reduce<A>(z:A, f:(z:A, _:[json.Id, EntityNode]) => A):A {
            return this.slice(this.graph).reduce(f, z);
        }
    }

    export class EdgeSlice {
        constructor(private graph:Graph, private slice:(graph:Graph) => [json.Id, EntityEdge][]) {
        }

        ofType(type:string):EdgeSlice {
            return new EdgeSlice(this.graph, andThen(this.slice, edges => {
                return edges.filter(([id, node]) => node.type === type);
            }));
        }

        filter(f:(_:[json.Id, EntityEdge]) => boolean):EdgeSlice {
            return new EdgeSlice(this.graph, andThen(this.slice, edges => {
                return edges.filter(f);
            }));
        }

        find(f:(_:[json.Id, EntityEdge]) => boolean):EdgeSlice {
            return new EdgeSlice(this.graph, andThen(this.slice, edges => {
                return edges.filter(f).slice(0, 1);
            }));
        }

        heads():NodeSlice {
            return new NodeSlice(this.graph, andThen(this.slice, edges => {
                return edges.reduce((heads, [id, edge]) => {
                    if (this.graph.hasNode(edge.head)) {
                        heads.push([edge.head, this.graph.node(edge.head)]);
                    }
                    return heads;
                }, <[json.Id, EntityNode][]>[]);
            }));
        }

        tails():NodeSlice {
            return new NodeSlice(this.graph, andThen(this.slice, edges => {
                return edges.reduce((tails, [id, edge]) => {
                    if (this.graph.hasNode(edge.tail)) {
                        tails.push([edge.tail, this.graph.node(edge.tail)]);
                    }
                    return tails;
                }, <[json.Id, EntityNode][]>[]);
            }));
        }

        map<A>(f:(_:[json.Id, EntityEdge]) => A):A[] {
            return this.slice(this.graph).map(f);
        }

        reduce<A>(z:A, f:(z:A, _:[json.Id, EntityEdge]) => A):A {
            return this.slice(this.graph).reduce(f, z);
        }
    }
}
