import React from "react";

const scoreBoard = () => (
  <div className="table-responsive">
    <table className="table table-bordered">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Tävlande</th>
          <th scope="col">Sisjön GK</th>
          <th scope="col">Torrekulla GK</th>
          <th scope="col">Hulta GK</th>
          <th scope="col">Närmast Pin</th>
          <th scope="col">Slag</th>
          <th scope="col">Poäng</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Anton Adielsson</th>
          <td>95/27</td>
          <td>0/0</td>
          <td>0/0</td>
          <td>1</td>
          <td className="table-success">95</td>
          <td className="table-success">29</td>
        </tr>
        <tr>
          <th scope="row">Martin Hansson</th>
          <td>85/28</td>
          <td>0/0</td>
          <td>0/0</td>
          <td>0</td>
          <td className="table-success">85</td>
          <td className="table-success">28</td>
        </tr>
        <tr>
          <th scope="row">Joakim Hammarström</th>
          <td>86/27</td>
          <td>0/0</td>
          <td>0/0</td>
          <td>0</td>
          <td className="table-success">86</td>
          <td className="table-success">27</td>
        </tr>
        <tr>
          <th scope="row">Patrick Marklund</th>
          <td>118/25</td>
          <td>0/0</td>
          <td>0/0</td>
          <td>1</td>
          <td className="table-success">118</td>
          <td className="table-success">27</td>
        </tr>
        <tr>
          <th scope="row">Jesper Leinonen</th>
          <td>106/25</td>
          <td>0/0</td>
          <td>0/0</td>
          <td>0</td>
          <td className="table-success">106</td>
          <td className="table-success">25</td>
        </tr>
        <tr>
          <th scope="row">Axel Esborn</th>
          <td>107/23</td>
          <td>0/0</td>
          <td>0/0</td>
          <td>0</td>
          <td className="table-success">107</td>
          <td className="table-success">23</td>
        </tr>
        <tr>
          <th scope="row">Oscar Nilsson</th>
          <td>106/21</td>
          <td>0/0</td>
          <td>0/0</td>
          <td>0</td>
          <td className="table-success">106</td>
          <td className="table-success">21</td>
        </tr>
        <tr>
          <th scope="row">Jonathan Karrin</th>
          <td>0/0</td>
          <td>0/0</td>
          <td>0/0</td>
          <td>1</td>
          <td className="table-success">0</td>
          <td className="table-success">0</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default scoreBoard;
