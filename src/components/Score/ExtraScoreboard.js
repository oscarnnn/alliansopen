import React from 'react';

const scoreBoard = () => (
    <div className="table-responsive">
    <table className="table table-bordered">
      <thead className="thead-dark">
        <tr>
          <th scope="col">Längsta slag</th>
          <th scope="col">Längsta putter</th>
          <th scope="col">Bästa hålresultat</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="table-success"></td>
          <td className="table-success"></td>
          <td className="table-success"></td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default scoreBoard;