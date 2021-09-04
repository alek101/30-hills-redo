import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<h1>Documentation</h1> <ul>
     <li>
        <h4>List of direct friends</h4>
        <p> /api/v1/people/direct/:id </p>
      </li> 
      <li>
        <h4>List of friends of friends</h4>
        <p> /api/v1/people/friends/:id </p>
      </li> 
      <li>
        <h4>List of suggested friends</h4>
        <p> /api/v1/people/suggested/:id </p>
      </li>  
     </ul>`;
  }
}
