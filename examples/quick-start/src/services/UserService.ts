import {ProjectService} from './ProjectService';

export class UserService {
    constructor(p: ProjectService) {
        console.log('UserService.constructor()', p);
    }
    say() {
        console.log('Hello from UserService');
    }
}