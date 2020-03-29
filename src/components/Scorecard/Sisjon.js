import React from "react";

import { Table } from "react-bootstrap";

const hulta = () => (
  <div className="table-responsive">
    <Table bordered responsive size="sm">
      <thead className="thead-dark">
      <tr>
          <th colSpan="12" scope="col" style={{textAlign:"center"}}>Sisjö GK</th>
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
          <td>5</td>
          <td>15</td>
          <td>13</td>
          <td>17</td>
          <td>1</td>
          <td>11</td>
          <td>3</td>
          <td>9</td>
          <td>7</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr className="table-active">
          <th scope="row">Par</th>
          <td>4</td>
          <td>4</td>
          <td>5</td>
          <td>3</td>
          <td>4</td>
          <td>4</td>
          <td>3</td>
          <td>6</td>
          <td>3</td>
          <td>36</td>
          <td>-</td>
        </tr>
        <tr className="table-active">
          <th scope="row">Längd</th>
          <td>351m</td>
          <td>325m</td>
          <td>437m</td>
          <td>111m</td>
          <td>334m</td>
          <td>259m</td>
          <td>126m</td>
          <td>573m</td>
          <td>144m</td>
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

export default hulta;
