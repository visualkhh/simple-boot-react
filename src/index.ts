import {Injectable} from './decorators/Injectable';
import 'reflect-metadata'
@Injectable()
class Test{

    constructor(s: string) {
    }
}


const a = Reflect.getMetadata('design:paramtypes', Test)
// const b = Reflect.getMetadata('design:paramtypes', Test)
console.log('--->', a)