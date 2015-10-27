// todo: consider switching from `Object` to native ES6 `Map` when the later is available in major browsers.

export type JSONSet<A> = {[id:string]:A};
export type EntitySet<A> = {[id:string]:Entity<A>};

export class Entity<A> {
    constructor(protected json:A) {
    }

    static fromJSON<A>(json:A):Entity<A> {
        return new Entity(json);
    }

    toJSON():A {
        return this.json;
    }

    equals<B>(that:Entity<B>):boolean {
        function equals($1:any, $2:any):boolean {
            if (typeof $1 !== typeof $2) {
                return false;
            } else if (typeof $1 !== "object") {
                return $1 === $2;
            } else {
                return Object.keys($1).length === Object.keys($2).length
                    && Object.keys($1).every(key => key in $2 && equals($1[key], $2[key]));
            }
        }

        return equals(this.json, that.json);
    }

    overlay<B, C>(that:Entity<B>):Entity<C> {
        function overlay($1:any, $2:any):any {
            if (typeof $1 !== typeof $2 || typeof $1 !== "object") {
                return $2;
            } else {
                return Object.keys($1).concat(Object.keys($2)).reduce((overlayResult, key) => {
                    if (key in $1 && key in $2) {
                        overlayResult[key] = overlay($1[key], $2[key]);
                    } else if (key in $2) {
                        overlayResult[key] = $2[key];
                    } else if (key in $1) {
                        overlayResult[key] = $1[key];
                    }
                    return overlayResult;
                }, <any>{});
            }
        }

        return new Entity(overlay(this.json, that.json));
    }
}

export class Singleton<A> {
    constructor(private entitySet:EntitySet<A>) {
    }

    static fromJSONSet<A>(jsonSet:JSONSet<A>) {
        return new Singleton(Object.keys(jsonSet).reduce((payloadMap, id) => {
            payloadMap[id] = Entity.fromJSON(jsonSet[id]);
            return payloadMap;
        }, <EntitySet<A>>{}));
    }

    get ids():string[] {
        return Object.keys(this.entitySet);
    }

    has(id:string):boolean {
        return id in this.entitySet;
    }

    value(id:string):Entity<A> {
        return this.entitySet[id];
    }

    get iterator():[string, Entity<A>][] {
        return this.ids.map(id => <[string, Entity<A>]>[id, this.value(id)]);
    }

    equals(that:Singleton<A>):boolean {
        return this.ids.length === that.ids.length &&
            this.iterator.every(([id]) => this.value(id).equals(that.value(id)));
    }

    intersects(that:Singleton<A>):boolean {
        return this.ids.some(id => that.has(id));
    }

    contains(that:Singleton<A>):boolean {
        return that.ids.every(id => this.has(id));
    }

    plus(that:Singleton<A>):Singleton<A> {
        return new composition.Plus(this, that);
    }

    minus(that:Singleton<A>):Singleton<A> {
        return new composition.Minus(this, that);
    }

    star(that:Singleton<A>):Singleton<A> {
        return new composition.Star(this, that);
    }

    flatten():Singleton<A> {
        return Singleton.fromJSONSet(this.toJSON());
    }

    toJSON() {
        return this.iterator.reduce((flatten, [id, value]) => {
            flatten[id] = value.toJSON();
            return flatten;
        }, <JSONSet<A>>{});
    }
}

namespace array_algebra {
    export function union<A>($1:A[], $2:A[]):A[] {
        return $2.reduce((unique:A[], el:A) => {
            return unique.concat(unique.indexOf(el) === -1 ? [el] : [])
        }, $1);
    }

    export function intersect<A>($1:A[], $2:A[]):A[] {
        return $1.filter(el => $2.indexOf(el) > -1);
    }

    export function difference<A>($1:A[], $2:A[]):A[] {
        return $1.filter(el => $2.indexOf(el) === -1);
    }
}

namespace composition {
    let emptyEntitySet = <A>() => <EntitySet<A>>{};

    export class Plus<A> extends Singleton<A> {
        constructor(private left:Singleton<A>, private right:Singleton<A>) {
            super(emptyEntitySet<A>());
        }

        get ids():string[] {
            return array_algebra.union(this.left.ids, this.right.ids);
        }

        value(id:string):Entity<A> {
            return this.right.has(id) ? this.right.value(id) : this.left.value(id);
        }
    }

    export class Minus<A> extends Singleton<A> {
        constructor(private left:Singleton<A>, private right:Singleton<A>) {
            super(emptyEntitySet<A>());
        }

        get ids():string[] {
            return array_algebra.difference(this.left.ids, this.right.ids);
        }

        value(id:string):Entity<A> {
            return this.right.has(id) ? undefined : this.left.value(id);
        }
    }

    export class Star<A> extends Singleton<A> {
        constructor(private left:Singleton<A>, private right:Singleton<A>) {
            super(emptyEntitySet<A>());
        }

        get ids():string[] {
            return this.left.ids;
        }

        value(id:string):Entity<A> {
            return this.right.has(id) ? this.left.value(id).overlay<A, A>(this.right.value(id)) : this.left.value(id);
        }
    }
}

export class Pair<A, B> {
    constructor(private $1:Singleton<A>, private $2:Singleton<B>) {
    }

    get ids$1():string[] {
        return this.$1.ids;
    }

    get ids$2():string[] {
        return this.$2.ids;
    }

    has$1(id:string):boolean {
        return this.$1.has(id);
    }

    has$2(id:string):boolean {
        return this.$2.has(id);
    }

    value$1(id:string):Entity<A> {
        return this.$1.value(id);
    }

    value$2(id:string):Entity<B> {
        return this.$2.value(id);
    }

    get iterator$1():[string, Entity<A>][] {
        return this.$1.iterator;
    }

    get iterator$2():[string, Entity<B>][] {
        return this.$2.iterator;
    }

    equals(that:Pair<A, B>):boolean {
        return this.$1.equals(that.$1) && this.$2.equals(that.$2);
    }

    intersects(that:Pair<A, B>):boolean {
        return this.$1.intersects(that.$1) || this.$2.intersects(that.$2);
    }

    contains(that:Pair<A, B>):boolean {
        return this.$1.contains(that.$1) && this.$2.contains(that.$2);
    }

    plus(that:Pair<A, B>):Pair<A, B> {
        return new Pair(
            new composition.Plus(this.$1, that.$1),
            new composition.Plus(this.$2, that.$2)
        );
    }

    minus(that:Pair<A, B>):Pair<A, B> {
        return new Pair(
            new composition.Minus(this.$1, that.$1),
            new composition.Minus(this.$2, that.$2)
        );
    }

    star(that:Pair<A, B>):Pair<A, B> {
        return new Pair(
            new composition.Star(this.$1, that.$1),
            new composition.Star(this.$2, that.$2)
        );
    }

    flatten():Pair<A, B> {
        return new Pair(
            this.$1.flatten(),
            this.$2.flatten()
        );
    }

    toJSON() {
        return {
            $1: this.$1.toJSON(),
            $2: this.$2.toJSON()
        };
    }
}
