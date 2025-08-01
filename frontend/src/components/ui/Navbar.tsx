import { type Component } from "solid-js";
import { A } from "@solidjs/router";

import { Calendar, Settings, LogOut, Trash2 } from "lucide-solid";

interface Navbar {
  currentUser?: { name: string; email: string } | null;
  onLogout?: () => void;
}

export const Navbar: Component<Navbar> = (props) => {
  return (
    <div class="navbar bg-base-100 shadow-sm">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl">TVTrash</a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li>
            <A href="/municipalities">Calendar</A>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul class="bg-base-100 rounded-t-none p-2">
                <li>
                  <a>Link 1</a>
                </li>
                <li>
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};
