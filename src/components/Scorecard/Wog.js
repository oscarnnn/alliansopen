import React from "react";

import { Table } from "react-bootstrap";

const wog = () => (
  <div className="table-responsive">
    <Table bordered responsive size="sm">
      <thead className="thead-dark">
      <tr>
          <th colSpan="12" scope="col" style={{textAlign:"center"}}>WoG Korthålsbana</th>
        </tr>
        <tr>
          <th scope="col">Hål</th>
          <th scope="col">1</th>
          <th scope="col">2</th>
          <th scope="col">3</th>
          <th scope="col">4</th>
          <th scope="col">5</th>
          <th scope="col">6</th>
          <th scope="col">7</th>
          <th scope="col">8</th>
          <th scope="col">9</th>
          <th scope="col">Slag</th>
          <th scope="col">Poäng</th>
        </tr>
      </thead>
      <tbody>
      <tr className="table-active">
          <th scope="row">Index</th>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr className="table-active">
          <th scope="row">Par</th>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>27</td>
          <td>-</td>
        </tr>
        <tr className="table-active">
          <th scope="row">Längd</th>
          <td>50m</td>
          <td>50m</td>
          <td>50m</td>
          <td>50m</td>
          <td>50m</td>
          <td>50m</td>
          <td>50m</td>
          <td>50m</td>
          <td>50m</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <th scope="row">Axel</th>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td className="table-success">0</td>
          <td className="table-success">0</td>
        </tr>
        <tr>
          <th scope="row">Jonathan</th>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td className="table-success">0</td>
          <td className="table-success">0</td>
        </tr>
        <tr>
          <th scope="row">Oscar</th>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td className="table-success">0</td>
          <td className="table-success">0</td>
        </tr>
        <tr>
          <th scope="row">Patrick</th>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td className="table-success">0</td>
          <td className="table-success">0</td>
        </tr>
      </tbody>
    </Table>
  </div>
);

export default wog;
