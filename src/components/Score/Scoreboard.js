import React from 'react';

const scoreBoard = () => (
    <div className="table-responsive">
    <table className="table table-bordered">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Tävlande</th>
          <th scope="col">WoG Korthål</th>
          <th scope="col">Sisjön GK</th>
          <th scope="col">Torrekulla GK</th>
          <th scope="col">Hulta GK</th>
          <th scope="col">Slag</th>
          <th scope="col">Poäng</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Axel</th>
          <td>0/0</td>
          <td>0/0</td>
          <td>0/0</td>
          <td>0/0</td>
          <td className="table-success">0‬</td>
          <td className="table-success">0</td>
        </tr>
        <tr>
          <th scope="row">Jonathan</th>
          <td>0/0</td>
          <td>0/0</td>
          <td>0/0</td>
          <td>0/0</td>
          <td className="table-success">0</td>
          <td className="table-success">0</td>
        </tr>
        <tr>
          <th scope="row">Oscar</th>
          <td>0/0</td>
          <td>0/0</td>
          <td>0/0</td>
          <td>0/0</td>
          <td className="table-success">0</td>
          <td className="table-success">0</td>
        </tr>
        <tr>
          <th scope="row">Patrick</th>
          <td>0/0</td>
          <td>0/0</td>
          <td>0/0</td>
          <td>0/0</td>
          <td className="table-success">0</td>
          <td className="table-success">0</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default scoreBoard;