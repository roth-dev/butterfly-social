import React, { createContext, useContext, useMemo } from "react";
import { AtpAgent, ModerationOpts } from "@atproto/api";

import { useHiddenPosts } from "@/state/prefs/hidden-posts";
import { DEFAULT_LOGGED_OUT_LABEL_PREFERENCES } from "@/state/queries/prefs/moderation";
import { useSession } from "@/state/session";
import { usePreferencesQuery } from "../queries/prefs";
import { useLabelDefinitions } from "./label-defs";

export const moderationOptsContext = createContext<ModerationOpts | undefined>(
  undefined
);

// used in the moderation state devtool
export const moderationOptsOverrideContext = createContext<
  ModerationOpts | undefined
>(undefined);

export function useModerationOpts() {
  return useContext(moderationOptsContext);
}

export function Provider({ children }: React.PropsWithChildren<{}>) {
  const override = useContext(moderationOptsOverrideContext);
  const { currentAccount } = useSession();
  const prefs = usePreferencesQuery();
  const { labelDefs } = useLabelDefinitions();
  const hiddenPosts = useHiddenPosts(); // TODO move this into pds-stored prefs

  const userDid = currentAccount?.did;
  const moderationPrefs = prefs.data?.moderationPrefs;
  const value = useMemo<ModerationOpts | undefined>(() => {
    if (override) {
      return override;
    }
    if (!moderationPrefs) {
      return undefined;
    }
    return {
      userDid,
      prefs: {
        ...moderationPrefs,
        labelers: moderationPrefs.labelers.length
          ? moderationPrefs.labelers
          : AtpAgent.appLabelers.map((did) => ({
              did,
              labels: DEFAULT_LOGGED_OUT_LABEL_PREFERENCES,
            })),
        hiddenPosts: hiddenPosts || [],
      },
      labelDefs,
    };
  }, [override, userDid, labelDefs, moderationPrefs, hiddenPosts]);

  return (
    <moderationOptsContext.Provider value={value}>
      {children}
    </moderationOptsContext.Provider>
  );
}
