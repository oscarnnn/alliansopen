import React from "react";

import { Table } from "react-bootstrap";

const torrekulla = () => (
  <div className="table-responsive">
    <Table bordered responsive size="sm">
      <thead className="thead-dark">
      <tr>
          <th colSpan="12" scope="col" style={{textAlign:"center"}}>Torrekulla GK</th>
        </tr>
        <tr>
          <th scope="col">Hål</th>
          <th scope="col">1</th>
          <th scope="col">2</th>
          <th scope="col">3</th>
          <th scope="col">4</th>
          <th scope="col">5</th>
          <th scope="col">6</th>
          <th scope="col">Slag</th>
          <th scope="col">Poäng</th>
        </tr>
      </thead>
      <tbody>
      <tr className="table-active">
          <th scope="row">Index</th>
          <td>7</td>
          <td>1</td>
          <td>13</td>
          <td>11</td>
          <td>15</td>
          <td>5</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr className="table-active">
          <th scope="row">Par</th>
          <td>5</td>
          <td>4</td>
          <td>4</td>
          <td>3</td>
          <td>3</td>
          <td>4</td>
          <td>23</td>
          <td>-</td>
        </tr>
        <tr className="table-active">
          <th scope="row">Längd</th>
          <td>447m</td>
          <td>347m</td>
          <td>246m</td>
          <td>158m</td>
          <td>134m</td>
          <td>309m</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <th scope="row">Axel</th>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td className="table-success">99</td>
          <td className="table-success">0</td>
        </tr>
        <tr>
          <th scope="row">Jonathan</th>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td className="table-success">99</td>
          <td className="table-success">0</td>
        </tr>
        <tr>
          <th scope="row">Oscar</th>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td className="table-success">99</td>
          <td className="table-success">0</td>
        </tr>
        <tr>
          <th scope="row">Patrick</th>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td>3</td>
          <td className="table-success">99</td>
          <td className="table-success">0</td>
        </tr>
      </tbody>
    </Table>

    <Table bordered responsive size="sm">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Hål</th>
          <th scope="col">7</th>
          <th scope="col">8</th>
          <th scope="col">9</th>
          <th scope="col">10</th>
          <th scope="col">11</th>
          <th scope="col">12</th>
          <th scope="col">Slag</th>
          <th scope="col">Poäng</th>
        </tr>
      </thead>
      <tbody>
      <tr className="table-active">
          <th scope="row">Index</th>
          <td>17</td>
          <td>3</td>
          <td>9</td>
          <td>16</td>
          <td>18</td>
          <td>2</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr className="table-active">
          <th scope="row">Par</th>
          <td>4</td>
          <td>4</td>
          <td>3</td>
          <td>3</td>
          <td>4</td>
          <td>4</td>
          <td>22</td>
          <td>-</td>
        </tr>
        <tr className="table-active">
          <th scope="row">Längd</th>
          <td>236m</td>
          <td>279m</td>
          <td>149m</td>
          <td>133m</td>
          <td>279m</td>
          <td>376m</td>
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
          <td className="table-success">0</td>
          <td className="table-success">0</td>
        </tr>
      </tbody>
    </Table>
  </div>
);

export default torrekulla;
