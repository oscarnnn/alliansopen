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
          <td>84/41</td>
          <td>0/0</td>
          <td>1</td>
          <td className="table-success">179</td>
          <td className="table-success">70</td>
        </tr>
        <tr>
          <th scope="row">Jesper Leinonen</th>
          <td>106/25</td>
          <td>98/36</td>
          <td>0/0</td>
          <td>1</td>
          <td className="table-success">204</td>
          <td className="table-success">63</td>
        </tr>
        <tr>
          <th scope="row">Axel Esborn</th>
          <td>107/23</td>
          <td>92/35</td>
          <td>0/0</td>
          <td>0</td>
          <td className="table-success">199</td>
          <td className="table-success">58</td>
        </tr>
        <tr>
          <th scope="row">Joakim Hammarström</th>
          <td>86/27</td>
          <td>84/27</td>
          <td>0/0</td>
          <td>1</td>
          <td className="table-success">170</td>
          <td className="table-success">56</td>
        </tr>
        <tr>
          <th scope="row">Oscar Nilsson</th>
          <td>106/21</td>
          <td>89/33</td>
          <td>0/0</td>
          <td>1</td>
          <td className="table-success">195</td>
          <td className="table-success">56</td>
        </tr>
        <tr>
          <th scope="row">Patrick Marklund</th>
          <td>118/25</td>
          <td>115/25</td>
          <td>0/0</td>
          <td>1</td>
          <td className="table-success">233</td>
          <td className="table-success">52</td>
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
          <th scope="row">Jonathan Karrin</th>
          <td>0/0</td>
          <td>132/17</td>
          <td>0/0</td>
          <td>0</td>
          <td className="table-success">132</td>
          <td className="table-success">17</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default scoreBoard;
