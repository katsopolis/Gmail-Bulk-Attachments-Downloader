import * as Kefir from 'kefir';
import BasicButtonViewController from '../../../../widgets/buttons/basic-button-view-controller';
import DropdownButtonViewController from '../../../../widgets/buttons/dropdown-button-view-controller';
import type GmailComposeView from '../gmail-compose-view';
import type { ComposeButtonDescriptor } from '../../../../driver-interfaces/compose-view-driver';
import type { Bus } from 'kefir-bus';
export type AddedButtonEvents = {
    buttonViewController: BasicButtonViewController | DropdownButtonViewController | undefined;
    buttonDescriptor: ComposeButtonDescriptor | null | undefined;
};
export default function addButton(gmailComposeView: GmailComposeView, buttonDescriptorStream: Kefir.Observable<ComposeButtonDescriptor | null | undefined, unknown>, groupOrderHint: string, extraOnClickOptions: Record<string, any>, bus: Bus<AddedButtonEvents, unknown>): void;
//# sourceMappingURL=add-button.d.ts.map