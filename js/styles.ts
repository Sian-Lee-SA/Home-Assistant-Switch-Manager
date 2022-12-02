import { css } from "lit";

export const fabStyle = css`
  .fab-container {
    position: absolute;
    right: 0;
    bottom: 0;
    overflow: hidden;
    padding: 1.2em;
  }
  ha-fab {
    position: relative;
  }
  ha-fab[collapse] {
    bottom: calc(-80px - env(safe-area-inset-bottom));
    transition: bottom 0.3s;
  }
  ha-fab.dirty {
    bottom: 0;
  }
  ha-fab.blocked {
    bottom: calc(-80px - env(safe-area-inset-bottom));
  }
`;