import {Singleton, Entity} from "./lib";

type ServerWAll = {title:string; descr:string};
type ServerWODescr = {title:string};
type ServerWOTitle = {descr:string};
type Server = ServerWAll | ServerWODescr | ServerWOTitle

var servers = {
    existing: Singleton.fromJSONSet<Server>({
        "s1": {title: "server #1", descr: "about server #1"},
        "s2": {title: "server #2", descr: "about server #2"},
        "s3": {title: "server #3", descr: "about server #3"},
        "s4": {title: "server #4", descr: "about server #4"},
        "s5": {title: "server #5", descr: "about server #5"}
    }),
    added: Singleton.fromJSONSet<Server>({
        "a6": {title: "added server #6", descr: "about server #6"},
        "a7": {title: "added server #7", descr: "about server #7"},
        "a8": {title: "added server #8", descr: "about server #8"}
    }),
    modified: Singleton.fromJSONSet<Server>({
        "s1": {title: "modified server #1"},
        "s3": {descr: "description for server #3"}
    }),
    deleted: Singleton.fromJSONSet<Server>({
        "s2": {title: "", descr: ""},
        "s5": {title: "", descr: ""}
    }),
};

function printOperational(label:string, operational:Singleton<Server>) {
    console.groupCollapsed(label);
    console.log("existing servers\n", JSON.stringify(servers.existing.toJSON(), null, 2));
    console.log("added servers\n", JSON.stringify(servers.added.toJSON(), null, 2));
    console.log("modified servers\n", JSON.stringify(servers.modified.toJSON(), null, 2));
    console.log("deleted servers\n", JSON.stringify(servers.deleted.toJSON(), null, 2));
    console.log("operational servers\n", JSON.stringify(operational.toJSON(), null, 2));
    console.groupEnd();
}

printOperational("S",
    servers.existing
);

printOperational("S + A",
    servers.existing.plus(servers.added)
);

printOperational("S - D",
    servers.existing.minus(servers.deleted)
);

printOperational("S * M",
    servers.existing.star(servers.modified)
);

printOperational("S + A - D",
    servers.existing.plus(servers.added).minus(servers.deleted)
);

printOperational("S + A * M",
    servers.existing.plus(servers.added).star(servers.modified)
);

printOperational("S - D * M",
    servers.existing.minus(servers.deleted).star(servers.modified)
);

printOperational("S + A - D * M",
    servers.existing.plus(servers.added).minus(servers.deleted).star(servers.modified)
);
