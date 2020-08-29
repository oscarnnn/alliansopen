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
          <th scope="row">Oscar</th>
          <td>104/27</td>
          <td>93/35</td>
          <td>0/0</td>
          <td>1</td>
          <td className="table-success">197</td>
          <td className="table-success">64</td>
        </tr>
        <tr>
          <th scope="row">Patrick</th>
          <td>112/24</td>
          <td>101/34</td>
          <td>0/0</td>
          <td>2</td>
          <td className="table-success">213</td>
          <td className="table-success">62</td>
        </tr>
        <tr>
          <th scope="row">Axel</th>
          <td>104/34</td>
          <td>116/26</td>
          <td>0/0</td>
          <td>1</td>
          <td className="table-success">220</td>
          <td className="table-success">62</td>
        </tr>
        <tr>
          <th scope="row">Jonathan</th>
          <td>150/16</td>
          <td>125/23</td>
          <td>0/0</td>
          <td>0</td>
          <td className="table-success">275</td>
          <td className="table-success">39</td>
        </tr>
        <tr>
          <th scope="row">Ludvig</th>
          <td>162/7</td>
          <td>142/16</td>
          <td>0/0</td>
          <td>1</td>
          <td className="table-success">304</td>
          <td className="table-success">25</td>
        </tr>
        <tr>
          <th scope="row">Ljubo</th>
          <td>131/22</td>
          <td>0/0</td>
          <td>0/0</td>
          <td>0</td>
          <td className="table-success">131</td>
          <td className="table-success">22</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default scoreBoard;
