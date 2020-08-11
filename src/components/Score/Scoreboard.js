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
          <th scope="col">Närmast Pin</th>
          <th scope="col">Slag</th>
          <th scope="col">Poäng</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Axel</th>
          <td>0/0</td>
          <td>104/34</td>
          <td>0/0</td>
          <td>0/0</td>
          <td>0</td>
          <td className="table-success">104‬</td>
          <td className="table-success">34</td>
        </tr>
        <tr>
          <th scope="row">Patrick</th>
          <td>0/0</td>
          <td>112/24</td>
          <td>0/0</td>
          <td>0/0</td>
          <td>2</td>
          <td className="table-success">112</td>
          <td className="table-success">28</td>
        </tr>
        <tr>
          <th scope="row">Oscar</th>
          <td>0/0</td>
          <td>104/27</td>
          <td>0/0</td>
          <td>0/0</td>
          <td>0</td>
          <td className="table-success">104</td>
          <td className="table-success">27</td>
        </tr>
        <tr>
          <th scope="row">Ljubo</th>
          <td>0/0</td>
          <td>131/22</td>
          <td>0/0</td>
          <td>0/0</td>
          <td>0</td>
          <td className="table-success">131</td>
          <td className="table-success">22</td>
        </tr>
        <tr>
          <th scope="row">Ludvig</th>
          <td>0/0</td>
          <td>162/7</td>
          <td>0/0</td>
          <td>0/0</td>
          <td>0</td>
          <td className="table-success">162</td>
          <td className="table-success">7</td>
        </tr>
        <tr>
          <th scope="row">Jonathan</th>
          <td>0/0</td>
          <td>134/5</td>
          <td>0/0</td>
          <td>0/0</td>
          <td>0</td>
          <td className="table-success">164</td>
          <td className="table-success">5</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default scoreBoard;