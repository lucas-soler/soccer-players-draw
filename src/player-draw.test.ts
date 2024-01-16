import { PlayerDraw, originalPlayers } from "./player";

describe("Player Draw", () => {
  it("should return different teams", () => {
    const playerDraw = new PlayerDraw(originalPlayers);
    playerDraw.drawTeams();

    const teamA = playerDraw.getTeamA();
    const teamB = playerDraw.getTeamB();

    for (let i = 0; i < teamA.length; i++)
      expect(teamA[i].name).not.toEqual(teamB[i].name);
  });
});
