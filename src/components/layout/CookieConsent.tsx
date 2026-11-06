"use client";

import { useEffect } from "react";
import * as CookieConsentLib from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import "./cookie-consent.css";

export default function CookieConsent() {
  useEffect(() => {
    CookieConsentLib.run({
      guiOptions: {
        consentModal: {
          layout: "bar inline",
          position: "bottom",
          equalWeightButtons: false,
        },
        preferencesModal: {
          layout: "box",
          equalWeightButtons: false,
        },
      },
      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {
          autoClear: {
            cookies: [{ name: /^_ga/ }, { name: "_gid" }],
          },
        },
        marketing: {},
      },
      onFirstConsent: ({ cookie }) => {
        updateGtagConsent(cookie.categories);
      },
      onConsent: ({ cookie }) => {
        updateGtagConsent(cookie.categories);
      },
      onChange: ({ cookie }) => {
        updateGtagConsent(cookie.categories);
      },
      language: {
        default: "en",
        translations: {
          en: {
            consentModal: {
              title: "",
              description:
                "We use cookies to improve your experience on our site. By using our site, you consent to cookies.",
              acceptAllBtn: "Accept All",
              acceptNecessaryBtn: "Reject",
              showPreferencesBtn: "Preferences",
            },
            preferencesModal: {
              title: "Cookie Preferences",
              acceptAllBtn: "Accept All",
              acceptNecessaryBtn: "Close",
              savePreferencesBtn: "Save and Close",
              closeIconLabel: "Close",
              serviceCounterLabel: "Service|Services",
              sections: [
                {
                  description: "Manage your cookie preferences below:",
                },
                {
                  title: "Essential",
                  description:
                    "Essential cookies enable basic functions and are necessary for the proper function of the website.",
                  linkedCategory: "necessary",
                  cookieTable: {
                    headers: { name: "Name", description: "Description", duration: "Duration" },
                    body: [
                      {
                        name: "cc_cookie",
                        description: "This cookie is used to store the user's cookie consent preferences.",
                        duration: "6 months",
                      },
                    ],
                  },
                },
                {
                  title: "Statistics",
                  description:
                    "Statistics cookies collect information anonymously. This information helps us understand how visitors use our website.",
                  linkedCategory: "analytics",
                  cookieTable: {
                    headers: { name: "Name", description: "Description", duration: "Duration" },
                    body: [
                      {
                        name: "_ga",
                        description: "Used by Google Analytics to distinguish unique users.",
                        duration: "2 years",
                      },
                      {
                        name: "_ga_*",
                        description: "Used by Google Analytics to persist session state.",
                        duration: "2 years",
                      },
                      {
                        name: "_gid",
                        description: "Used by Google Analytics to distinguish users.",
                        duration: "24 hours",
                      },
                    ],
                  },
                },
                {
                  title: "Marketing",
                  description:
                    "Marketing cookies are used to follow visitors to websites. The intention is to show ads that are relevant and engaging to the individual user.",
                  linkedCategory: "marketing",
                },
                {
                  title: "Cookie Policy",
                  description:
                    "You can read more about our use of cookies in our Cookie Policy.",
                },
              ],
            },
          },
        },
      },
    });
  }, []);

  return null;
}

type ConsentCategories = string[];

function updateGtagConsent(categories: ConsentCategories) {
  if (typeof window === "undefined") return;
  const w = window as typeof window & { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag !== "function") return;

  w.gtag("consent", "update", {
    analytics_storage: categories.includes("analytics") ? "granted" : "denied",
    ad_storage: categories.includes("marketing") ? "granted" : "denied",
    ad_user_data: categories.includes("marketing") ? "granted" : "denied",
    ad_personalization: categories.includes("marketing") ? "granted" : "denied",
  });
}
