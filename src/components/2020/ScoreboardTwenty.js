import React from "react";

const ScoreBoardTwenty = () => (
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
          <td>100/35</td>
          <td>2</td>
          <td className="table-success">297</td>
          <td className="table-success">101</td>
        </tr>
        <tr>
          <th scope="row">Axel</th>
          <td>104/34</td>
          <td>116/26</td>
          <td>111/34</td>
          <td>2</td>
          <td className="table-success">331</td>
          <td className="table-success">98</td>
        </tr>
        <tr>
          <th scope="row">Patrick</th>
          <td>112/24</td>
          <td>101/34</td>
          <td>128/19</td>
          <td>2</td>
          <td className="table-success">341</td>
          <td className="table-success">81</td>
        </tr>
        <tr>
          <th scope="row">Ljubo</th>
          <td>131/22</td>
          <td>150/19</td>
          <td>133/28</td>
          <td>1</td>
          <td className="table-success">414</td>
          <td className="table-success">71</td>
        </tr>
        <tr>
          <th scope="row">Jonathan</th>
          <td>150/16</td>
          <td>125/23</td>
          <td>149/15</td>
          <td>0</td>
          <td className="table-success">424</td>
          <td className="table-success">54</td>
        </tr>
        <tr>
          <th scope="row">Ludvig</th>
          <td>162/7</td>
          <td>142/16</td>
          <td>162/9</td>
          <td>1</td>
          <td className="table-success">466</td>
          <td className="table-success">34</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default ScoreBoardTwenty;
